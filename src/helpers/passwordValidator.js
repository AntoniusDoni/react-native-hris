export function passwordValidator(password) {
    if (!password) return "Password Tidak Boleh Kosong."
    if (password.length < 4) return 'Password Berisi 4 Karakter'
    return ''
  }