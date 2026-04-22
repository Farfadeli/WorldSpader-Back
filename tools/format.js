const check_input_inscription = (
  first_name,
  last_name,
  username,
  mail,
  pwd,
) => {
  if (
    first_name == null ||
    last_name == null ||
    username == null ||
    mail == null ||
    pwd == null
  )
    return false;
  if (
    first_name == "" ||
    last_name == "" ||
    username == "" ||
    mail == "" ||
    pwd == ""
  )
    return false;

  return true;
};

module.exports = { check_input_inscription };
