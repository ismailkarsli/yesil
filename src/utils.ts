export const stringToBoolean = (str: unknown): boolean => {
	if (str === true || str === "true") return true;
	return false;
};
