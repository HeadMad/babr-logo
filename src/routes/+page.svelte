<script>
  import Logo from '$lib/logo.svelte';

  let fill = $state('#f00');

  let copied = $state(false);

  async function setClipboard(text) {
  const type = "text/plain";
  const blob = new Blob([text], { type });
  const data = [new ClipboardItem({ [type]: blob })];
  await navigator.clipboard.write(data);
  copied = true;
  setTimeout(() => copied = false, 2000);
}
</script>

<svelte:head>
  <link rel="icon" href="%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='64' height='64' rx='9' fill='white'/%3E%3Cpath d='M28.2295 20.3081C30.5397 24.6542 30.6029 24.6456 35.9625 19.247C42.215 12.9462 47.4589 12.3351 52.4183 17.3327C61.697 26.6807 44.163 52 28.4106 52C26.1194 52 20.8588 48.7829 16.7227 44.8526C8.79176 37.3147 6.89219 28.4845 11.382 20.0278C14.4104 14.3277 25.1485 14.5062 28.2295 20.3081Z' fill='%23{fill.slice(1)}'/%3E%3C/svg%3E%0A">
  
</svelte:head>

<div class="wrapper">
  <div class="color-picker">
    
    <label style:background={fill}>
      <input type="color" bind:value={fill}/>
    </label>
    
    <span  class="color-value" onclick={() => setClipboard(fill)}>{fill}</span> <small class:copied class="clipboard">скопированно</small>
  </div>
  
  <div class="logo">
    <Logo {fill}/>
  </div>
</div>


<style>

  :global(body) {
    margin: 0;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 1rem;
    /* align-items: center; */
  }

  .logo{
    flex-grow: 1;
  }

  .color-picker {
    height: 2rem;
    line-height: 2rem;
  }
  
  .color-value {
    font-size: 1.2rem;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;
    cursor: pointer;
    border-bottom: 1px dashed;
  }

  .clipboard {
    margin-left: .5rem;
    opacity: 0;
  }
  
  .clipboard.copied {
    transition: .3;
    opacity: .6;
  }

  label {
    display: inline-block;
    margin-right: 1rem;
    width: 2rem;
    height: 2rem;
    vertical-align: middle;
    border-radius: .3rem;
  }
  input {
    display: none;
  }
</style>