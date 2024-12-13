/** @type {import('./$types').PageLoad} */
export async function load({url}) {
  let [logoHex, bgHex] = url.pathname.slice(1).split('/');

  const data = {
    logoColor: '#' + (logoHex || '000000'),
    bgColor: '#' + (bgHex || 'ffffff'),
    isMainPage: url.pathname === '/'
  };

  return data;
}