export function emailValidator(email) {
    const re = /\S+@\S+\.\S+/
    if (!email) return "Email Tidak Boleh Kosong."
    if (!re.test(email)) return 'Ooops! Alamat Email Tidak Valid.'
    return ''
  }