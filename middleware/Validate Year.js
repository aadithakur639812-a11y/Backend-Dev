export function validateYear(req, res, next) {
  const { year } = req.body;

  if (!year) return next();

  const currentYear = new Date().getFullYear();

  if (
    isNaN(year) ||
    year < 1000 ||
    year > currentYear
  ) {
    return res.status(400).json({
      message: "Year must be between 1000 and current year"
    });
  }

  next();
}
