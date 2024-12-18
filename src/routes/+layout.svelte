<script>
  import Logo from '$lib/logo.svelte';
  import CopyButton from '$lib/copy-button.svelte';
  import {page} from '$app/stores';

  let [logoHex, bgHex] = $page.url.pathname.slice(1).split('/');
  console.log()

  let logoFill = $state('#' + (logoHex || '000000'));
  let bgFill = $state('#' + (bgHex || 'ffffff'));
  
  let faviconPath = $derived('data:image/svg+xml;base64,' + btoa(`<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" rx="9" fill="${bgFill}"/><path d="M28.2295 20.3081C30.5397 24.6542 30.6029 24.6456 35.9625 19.247C42.215 12.9462 47.4589 12.3351 52.4183 17.3327C61.697 26.6807 44.163 52 28.4106 52C26.1194 52 20.8588 48.7829 16.7227 44.8526C8.79176 37.3147 6.89219 28.4845 11.382 20.0278C14.4104 14.3277 25.1485 14.5062 28.2295 20.3081Z" fill="${logoFill}"/></svg>`));



  async function setClipboard(text) {
  const type = "text/plain";
  const blob = new Blob([text], { type });
  const data = [new ClipboardItem({ [type]: blob })];
  await navigator.clipboard.write(data);
};

function copyLink() {
  setClipboard(`${location.origin}/${logoFill.slice(1)}/${bgFill.slice(1)}`);
}

function invertHex(hex) {
  return '#' + (Number(`0x1${hex.slice(1)}`) ^ 0xFFFFFF).toString(16).substr(1);
}

function getContrast50(hexcolor) {
   return (parseInt(hexcolor.slice(1), 16) > 0xffffff / 2) ? '#000000' : '#ffffff';
}

</script>


<svelte:head>
  <link rel="icon" href={faviconPath} />
</svelte:head>

<div class="wrapper" style="background: {bgFill};--color: {getContrast50(bgFill)}">
  <div class="color-picker">
    
    <div class="row">
      <label onclick={() => setClipboard(logoFill)}>
        <CopyButton/>
          <span class="label">Лого: </span>
      </label>
        <label class="color-picker">
        <input type="color" bind:value={logoFill}/>
        <span class="color-value" >{logoFill}</span>
      </label>
    </div>

    <div class="row">
      <label onclick={() => setClipboard(bgFill)}>
        <CopyButton/>
          <span class="label">Фон: </span>
      </label>
      <label class="color-picker">
        <input type="color" bind:value={bgFill}/>
        <span class="color-value" >{bgFill}</span>
      </label>
    </div>
  </div>
  
  <div class="logo">
    <Logo fill={logoFill}/>
  </div>

  <div class="share">
    <button onclick={() => copyLink()} class="share-button">Ссылка на эти цвета</button>
  </div>
</div>


<style>

  

  .share {
    text-align: center;
  }

  .share-button {
    border: none;
    border-radius: .2rem;
    background: none;
    cursor: pointer;
    padding: 0.5rem 1rem;
    opacity: .6;
    color: var(--color);
    text-decoration: underline;
  }

  .label {
    display: inline-block;
    min-width: 3rem;
    /* padding: 0.2rem .5rem; */
    opacity: .5;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 1rem;
    width: 100vw;
    min-height: 100vh;
    min-height: 100dvh;
    color: var(--color, currentColor);
    /* align-items: center; */
  }

  .logo{
    flex-grow: 1;
    display: flex;
  }

  .color-picker {
    line-height: 2rem;
    cursor: pointer;
  }
  
  .color-value {
    /* font-size: 1.2rem; */
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 600;
    margin-left: .5rem;
    /* border-bottom: 1px dashed; */
  }


</style>