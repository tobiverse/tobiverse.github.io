const params = new URLSearchParams(window.location.search);
const it = params.get('item');
const server = it[0];

console.log("[PROC. 1]: BUSY")
async function fetchTitles() {
    try {
        console.log("[PROC. 1]: DEBUG: URL = https://raw.githubusercontent.com/tobiverse/servers/main/titles.json")
        const response = await fetch('https://raw.githubusercontent.com/tobiverse/servers/main/titles.json');
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
        if (server in data)  {
            const serverf = data[server]
            console.log("[PROC. 1]: COMP.")
            console.log("[PROC. 2]: BUSY")
            async function fetchContent() {
                    try {
                        console.log(`[2]: DEBUG: URL = https://raw.githubusercontent.com/tobiverse/servers/main/${serverf}/content.json`)
                        const response = await fetch(`https://raw.githubusercontent.com/tobiverse/servers/main/${serverf}/content.json`);
                        if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const servcontent = await response.json();
                    console.log("[PROC. 2]: COMP.") 
                    console.log("[PROC. 3]: BUSY")
                    if (it in servcontent) {
                        const pmeta = document.querySelectorAll('.pmetadata');
                        pmeta.forEach(element => {
                            element.textContent = `${servcontent[it].name} for ${servcontent[it].price.ta}TA & ${servcontent[it].price.ter}TER.`   
                    });
                    } 
                    else { alert ("That key does not exist!") }
                    console.log("[PROC. 3]: COMP.")
                    console.log("[PROC. 4]: BUSY")
                    const pimage = document.querySelectorAll('.pimage');
                    console.log(`[PROC. 4]: DEBUG: IMG = https://raw.githubusercontent.com/tobiverse/servers/main/${serverf}/images/${servcontent[it].image`)
                    pimage.forEach(element => {
                        element.src = `https://raw.githubusercontent.com/tobiverse/servers/main/${serverf}/images/${servcontent[it].image}`;
                    });
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                }
            fetchContent(); 
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    }
fetchTitles();
