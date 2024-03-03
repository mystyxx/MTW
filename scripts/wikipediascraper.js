async function fetchFeaturedArticle(langue, mode) {
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');
    let url;
    if(langue == french) {url = `https://api.wikimedia.org/feed/v1/wikipedia/fr/featured/${year}/${month}/${day}`;}
    else{url = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${year}/${month}/${day}`;}

    try {
        let response = await fetch(url, {
            headers: {
                'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJhODJmMzY0OThiMDdmMjA3MzU0ZmQyMTE4OThlMjMwNCIsImp0aSI6IjZiZWQ5ZDBmZjIzNTYzYjdmMWIzYzQ5YmU3OTBkMzUxOWUyMDE5YWYzZmYxMWIzYzRlZDRlNmYxM2EyZDJmNDc5MzMxN2NlYjM0NzQ1OWI4IiwiaWF0IjoxNjk2NDIwOTM5LjM2MDI5OCwibmJmIjoxNjk2NDIwOTM5LjM2MDMsImV4cCI6MzMyNTMzMjk3MzkuMzU5MTksInN1YiI6IjczOTIxNTI5IiwiaXNzIjoiaHR0cHM6Ly9tZXRhLndpa2ltZWRpYS5vcmciLCJyYXRlbGltaXQiOnsicmVxdWVzdHNfcGVyX3VuaXQiOjUwMDAsInVuaXQiOiJIT1VSIn0sInNjb3BlcyI6WyJiYXNpYyJdfQ.JGMDuw2GheGwPV5r_Jnfn_uugoTCoGuPjKNc3Xv7TV6YtUaOf7ef6Fpj6k7gfAGLqa5jdnEBFJF7WB6y08pz0FxLnIWtxUyQqWPcktN0GN-T0GQpPSZ6XGW6cqo_n98gEElVarvkWP7n6gbky4b-oqb9QRWlz8LvOfXIVQBqHEIyuMZLM5hlwuNFRagKRbays3UIb6RZZxdBn6iMekRsyVG9ngnRMorHThP9UOzrVdrwqfqJlM7YVg2Xpz4Cphm8lPUlniloVQj9HFB_LvdaMnk36DBCjDipoVosltrV-nqx4Sl5QX_9NBid_U0U6hhhx1XV1XTXc5DKM-JIOvaFX5SNBeYbjHQxDjobFUSBZd8RwVxanW8ME7daqOErUXbbU7OQuVobZjt0Bopvg2yFfLhYMMpKRxYA6CEtWhzoXrgAAAmHuvx-qnw1-2J1pP0Yi-OXAp9NY3rZ-JU82yfeGToXeH5Hv95BBcmrUCPwn1JASGMaXj7TQRRr_O6fiLg3ysV99VoKprC04K0IynKW9hHkOFFH_zrToM8wWT2PMvDsq-vRCVGu79kicM7bw2U2vSnoz84e1Cfvkzf40-qrgTAxxT45OMhraTk0ivMdXvhHuh0kEYBvWbbW0cl68ghkUy6S2COO2PY7MHKLHi4NDM18uLa3W9jnTwrvt5AkMUY',
                'Api-User-Agent': 'MTW (paulroux621@gmail.com)'
            }
        });

        tfaDict = await response.json();
        return (tfaDict);

    } catch (NetworkError) {
        printWords('internet error. please check your internet connection or contact mysty.xx on discord.'.split(' '));
        inputbox.value = '';
        console.error(NetworkError);
    }
}

