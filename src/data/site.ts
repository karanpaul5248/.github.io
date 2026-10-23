/**
 * Central site configuration.
 * OWNER: edit values in this one file to update them everywhere.
 */
export const site = {
  name: 'Karan Kreation',
  email: 'Karankang190@gmail.com',
  location: 'Canada',
  availability: 'Based in Canada · Available worldwide for destination weddings and productions',
  url: 'https://karanpaul5248.github.io/',
  instagram: 'https://www.instagram.com/karankreation',
  /**
   * FORMSPREE — the contact form is NOT live until you replace this value.
   * 1. Create a free form at https://formspree.io (destination: the email above)
   * 2. Copy its endpoint, e.g. https://formspree.io/f/abcdwxyz
   * 3. Paste it below, replacing YOUR_FORM_ID, then rebuild / push to GitHub.
   * While the placeholder is in place the site clearly tells visitors the
   * form is not connected yet and offers a direct email link instead.
   * Nothing is ever silently discarded.
   */
  formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',
} as const

export const isFormConfigured = (): boolean =>
  !site.formspreeEndpoint.includes('YOUR_FORM_ID')
