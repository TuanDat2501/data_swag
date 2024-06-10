const express = require('express')
const cors = require('cors');
const {google} = require('googleapis')
require('dotenv').config();
const app = express()
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});
const port = 3001
/* const NEXT_PUBLIC_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDZGsviCdzEycXY\n8jtEmEKNjnVYS2qlmPEeUHwZO8wqBnQq+z5XKm/lfuy5+Z4C2wefRjPNHr27ltpc\nySq+/vy3XIFehGOhlZDWGClwF6DZZ3j4mzf/0pnEX/UXXM2G9Z9nJJbll/v4AoHj\nPGeIJz+ji/cE1qZsBOXVe/97ROX9JOs4sDla2m16i3JOoBo0iU8CnSiED1gxNm33\nCzpT90lDax5I7NGLYquOqTjutjyQhxmqIhdwd8C9MZ6AZlysd6rSjguD7MgVxKhQ\n/xD6Fqj2OB/dj66R4H6b/0nytEryj79+ziM2loqooVLqTCEskGqfqGHbg+VhhDvU\n5q5uZj09AgMBAAECggEAGJpFiAZDlyZhbhIXPtD9W8LMz/Zt7bms+1k2Evr4ijuk\nfvltSV31A74UMAgWTK8LCFThimllKWSxNqoSVsYZF+NbAr3Ad592JBjlWz9GOlTU\nO+IFIM+6HqucH+tjnBtqFrtqATcttd983iYqel6uQseZ9NmpTtzoOb7dRxgZ8wt+\nS0jj7fzI6ifCXZn9x5rCkC3aIkVijBk0IHLshXY/+FB8KPd17LvKDU+4yOmXcpYE\nGSVaHYW4j1Iq/hj9F5fVrcU77JgLsG9jReecWeqVSCHtpczDNVmvbfAWM6C8ay+B\nQsWK+toBDXrLm2muXcXwHgG+Wc+V18nTpFXjWv7RYQKBgQDyir0UHL6vRCmNJT83\nk8rt7KzNtcPig9GirOuZOljrcI3eYllmq4yCzt1IaXFF2L4u4ohAODafq0Nw5/95\nvgAnfJd9E7kS+3/AiqDVk86rKlidsDEs6U3v6NG97xW4X+WB1Zo5OEOcQ/F+buNF\n8f4W0zrpiBcfa9uZ2Geyz9tT3QKBgQDlJrntMKP0XenaSojvU6imFFj6QoBGIpms\nAupZLHtJeb5fvndCXYzDQelSZvCnrA7Doijda4i/EgakGA/pgPvrjVwA5KjuG6dn\noZe15XXj1UJH/h0o4sC80QdDYOOFAMgyd0Vqhu3XuKKXLbrrdzpw9kmgSr2b1UBG\n+t3EzrMo4QKBgQCha2a1mP/ro8DHuG9fbNRVDvxfGEbbXYHK860FWMjPQSSaSfhY\nFXo5oLWzOMHzi3HfwFKP8xmfoJsM7Mqh2qs9nHUyAEtfb9Sxb1Hlcy7Lyi4aHKZN\nzqRZNClLcHCTOfeENoYi6OhOewWhcOl/prPFuyVtQW6qMd2AgX9aiW3eXQKBgQDg\nGxWu0Okn7kjswgRV+z1u32t9pVgKP4CG53sFpykT3MrAnGfKMe+ebnGfsykc8nql\n/Yt1sNtV8m0oQpgdR5YY8nDONtK3u7fm8/SJYlX/ceuWuQEPoWPZxZwS20joJLGm\nGVt8KWWmmd35eDHcYwh2vYeYCkCRjOeGA4asGXLCQQKBgQDinuvjeMle7TAzmRCF\n4Ao7NrQEjzT+E6R3Eqxmtw/rt8rtuHbfI83Xrl8eAMDnJwbZCaFFwqGNwwqkIYIm\ndCZkRd/FovpPZ+PfORxuiDfnHu/USdmuYeVv8Wdo0xj9j8bE70HapTogj/WLFXfP\nYQgImtyUV/B2vh1/Uc1cdFNq2w==\n-----END PRIVATE KEY-----\n"
const NEXT_PUBLIC_CLIENT_ID_SHEET="106975458508491465532"
const NEXT_PUBLIC_CLIENT_EMAIL_ID="demo-ggsheet@sunlit-charge-423607-a3.iam.gserviceaccount.com
const NEXT_PUBLIC_SHEET_ID="1FGkk4LScYui8RuiGCgGMt-GREZuG9SDgKwhwyXaaFXc */
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/write', (req, res) => {
    
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.CLIENT_EMAIL_ID,
            client_id: process.env.CLIENT_ID_SHEET,
            private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: [
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/spreadsheets',
        ],
    });

    const sheets = google.sheets({
        auth,
        version: 'v4',
    });
    const {name,email,linkUpload,linkYoutube,message}=req.body
    const response = sheets.spreadsheets.values.append({
        spreadsheetId: "1FGkk4LScYui8RuiGCgGMt-GREZuG9SDgKwhwyXaaFXc",
        range: 'Page1!A2:E2',
        valueInputOption: 'RAW',
        requestBody: {
            values: [[name||"",email||"",linkUpload||"",linkYoutube||"",message||""]],
            
        },
    });
    const data = "Writing data to Google Sheet succeeds!"
    res.send(data);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})