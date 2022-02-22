<script lang="ts">
    function sign() {
        location.replace('/api/auth/signin/google');
    }
</script>

<button on:click={sign}> CLICK TO SIGN-IN </button>
