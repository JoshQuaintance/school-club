<script lang="ts">
    import { userJWT } from '$shared/utils/stores';

    // console.log($userJWT)
    if ($userJWT) {
        fetch('/api/cookie/set-jwt', {
            method: 'POST'
        });
    }
</script>
