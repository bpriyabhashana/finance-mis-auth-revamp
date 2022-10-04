export function getGmailMailTo(email, subject) {
  var urlToReturn =
    "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=" + email;
  if (subject) {
    urlToReturn += "&su=" + subject;
  }
  return urlToReturn;
}
