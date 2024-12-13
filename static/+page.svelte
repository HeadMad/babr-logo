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

<Logo fill={logoFill}/>