<script>
  const {onclick, fill} = $props();
</script>

<button {onclick}>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M7 18V2h13v16zm2-2h9V4H9zm-6 6V6h2v14h11v2zm6-6V4z"/></svg>
</button>

<style>
  svg {
    vertical-align: text-bottom;
  }

  path{
    fill: var(--color, currentColor);
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    width: 1.4rem;
    height: 1.4rem;
    padding: .2rem;
    /* margin-left: .5rem; */
    opacity: .3;
  }
</style>