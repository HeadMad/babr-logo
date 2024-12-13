<script>
  import Logo from '$lib/logo.svelte';
  import CopyButton from '$lib/copy-button.svelte';

  let logoFill = $state('#000000');
  let bgFill = $state('#ffffff');

  let copied = $state(false);

  
  $effect(() => {
    logoFill = window.localStorage.getItem('logoFill') ?? '#000000';
    bgFill = window.localStorage.getItem('bgFill') ?? '#ffffff';
  });


  $effect(() => {
    window.localStorage.setItem('logoFill', logoFill);
    window.localStorage.setItem('bgFill', bgFill);
  });

  async function setClipboard(text) {
  const type = "text/plain";
  const blob = new Blob([text], { type });
  const data = [new ClipboardItem({ [type]: blob })];
  await navigator.clipboard.write(data);
  copied = true;
  setTimeout(() => copied = false, 2000);
}
</script>

<div class="wrapper" style:background={bgFill}>
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
</div>


<style>

  :global(body) {
    margin: 0;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .row {
    display: flex;
    align-items: baseline;
    /* justify-content: center; */
    margin-bottom: .5rem;
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

  .clipboard {
    margin-left: 1rem;
    opacity: .5;
  }

  .clipboard.copied {
    background: none;
    border: none;
  }
  

  .color {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    vertical-align: middle;
    border-radius: .3rem;
  }

</style>