import PostRepository from '../repository/PostRepository.js';

import urlMetadata from 'url-metadata';

export async function ShowPosts(req, res) {
	try {
		// const time = req.query.time;
		// console.log('time');
		// if (time) {
		// 	const userId = res.locals.userId;
		// 	const { rows: allPosts } = await PostRepository.getNewPosts(userId, time);
		// 	return res.status(201).send(allPosts);
		// }
		const userId = res.locals.userId;
		// const { rows: haveFriends } = await PostRepository.getFollowersIds(userId);
		// if (haveFriends.length === 0) {
		// 	return res
		// 		.status(201)
		// 		.send("You don't follow anyone yet. Search for new friends!");
		// }
		const cut = req.query.cut;

		const { rows: allPosts } = await PostRepository.getAllPosts(userId, cut);
		if (allPosts.length === 0) {
			return res.status(201).send('No posts found from your friends');
		}
		return res.status(201).send(allPosts);
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}
}

export async function gettingPostsByUser(req, res) {
	const { userId } = req.params;
	const cut = req.query.cut;
	try {
		const { rows: posts } = await PostRepository.getPostsbyUser(userId, cut);

		return res.status(201).send(posts);
	} catch {
		return res.sendStatus(500);
	}
}

export async function CreatePost(req, res) {
	console.log('entrei');

	try {
		const userId = res.locals.userId;

		const { url, description } = req.body;

		let allDescription = description.split(' ');

		let arrayHashs = [];

		allDescription.map((item) => {
			if (item[0] === '#') {
				let trend = item.replace('#', '');
				arrayHashs.push(trend);
			}
		});

		urlMetadata(url).then(
			async function (metadata) {
				// success handler
				const body = {
					userId: userId,
					url,
					description,
					imagePreview: metadata.image,
					titlePreview: metadata.title,
					descriptionPreview: metadata.description,
				};

				await PostRepository.createMyPost(body);
				const { rows: mypost } = await PostRepository.getPostByUserAndHash(
					userId,
					url,
					description
				);

				let bodyHash;

				for (let counter = 0; counter < arrayHashs.length; counter++) {
					bodyHash = '';

					const { rows: hashExist } = await PostRepository.getHash(
						arrayHashs[counter]
					);

					if (hashExist.length === 0) {
						await PostRepository.insertHash(arrayHashs[counter]);

						const { rows: hashExist } = await PostRepository.getHash(
							arrayHashs[counter]
						);

						bodyHash = {
							idPost: mypost[0].id,
							idHash: hashExist[0].id,
						};
					} else {
						bodyHash = {
							idPost: mypost[0].id,
							idHash: hashExist[0].id,
						};
					}

					const { rows: hashPostExist } = await PostRepository.getPostWithHash(
						bodyHash.idPost,
						bodyHash.idHash
					);

					if (hashPostExist.length === 0) {
						await PostRepository.insertPostWithHash(
							bodyHash.idPost,
							bodyHash.idHash
						);
					}
				}
				return res.status(201).send(body);
			},
			function (error) {
				// failure handler
				return res.send(error);
			}
		);
	} catch {
		return res.sendStatus(500);
	}
}

export async function DeletePost(req, res) {
	try {
		const userId = res.locals.userId;
		const { idPost } = req.params;
		await PostRepository.deletePostLikes(idPost);
		await PostRepository.deletePostHashtags(idPost);
		await PostRepository.deletePostById(idPost);
		const { rows: allPosts } = await PostRepository.getAllPosts(userId);
		res.status(200).send(allPosts);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function EditPost(req, res) {
	try {
		const userId = res.locals.userId;
		const { message } = req.body;
		const { idPost } = req.params;
		await PostRepository.deletePostHashtags(idPost);
		await PostRepository.updateDescriptionPost(idPost, message);
		const { rows: allPosts } = await PostRepository.getAllPosts(userId);
		res.status(201).send(allPosts);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function currentTime(req, res) {
	// try {
	// 	const { rows: timestamp } = await PostRepository.getTimeStamp();
	// 	console.log(timestamp);
	// 	return res.send(timestamp[0].timezone);
	// } catch {
	// 	return res.sendStatus(500);
	// }
}
