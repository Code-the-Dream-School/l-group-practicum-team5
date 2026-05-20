const validateCreateGroup = (req, res, next) => {
  const { name, invite_code, created_by } = req.body;

  // Required fields
  if (!name || !invite_code || !created_by) {
    return res.status(400).json({
      message: 'name, invite_code, and created_by are required',
    });
  }

  // Name validation
  if (typeof name !== 'string' || name.trim().length < 3) {
    return res.status(400).json({
      message: 'Group name must be at least 3 characters long',
    });
  }

  // Invite code validation
  if (invite_code.length < 4 || invite_code.length > 20) {
    return res.status(400).json({
      message: 'Invite code must be between 4 and 20 characters',
    });
  }

  next();
};

const validateUpdateGroup = (req, res, next) => {
  const { name, invite_code } = req.body;

  if (name && name.trim().length < 3) {
    return res.status(400).json({
      message: 'Group name must be at least 3 characters long',
    });
  }

  if (invite_code && (invite_code.length < 4 || invite_code.length > 20)) {
    return res.status(400).json({
      message: 'Invite code must be between 4 and 20 characters',
    });
  }

  next();
};

module.exports = {
  validateCreateGroup,
  validateUpdateGroup,
};
