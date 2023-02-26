import joi from 'joi';

const urlSchema = joi.object({
	url: joi.string().uri().required(),
	description: joi.string(),
});

export default urlSchema;
