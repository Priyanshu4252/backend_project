const asyncHandler = (fun) => async (req, res, next) => {
	try {
		await fun(req, res, next);
	} catch (error) {
		next(error);
	}
};

export default asyncHandler;
