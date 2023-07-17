const express = require('express')
const app = express()
const Playlist = require('./src/model/playlist.model')

app.use(express.json())

const playlist = new Playlist()

// create new song
app.post('/songs', (req,res) => {
    try {
        const {title, artists, url} = req.body;

        // check when data empty
        if(!title || !artists || !url) {
            res.status(400).json({
                status: 400,
                message: "Invalid song data"
            });
        }

        // check when url already exists
        const urlCheck = playlist.songs.some(song => song.url === url)
        if(urlCheck) {
            res.status(400).json({
                status: 400,
                message: "Song with this url already exists in the playlist"
            });
        }

        playlist.addSong(title, artists, url);

        res.status(201).json({
            status: 201,
            message: "song added successfully",
        })

    } catch (err) {
        throw new Error(err.message);
    }
    
})

// get one song (play song with index)
app.get('/songs/:index', (req, res) => {

    try {
        const {index} = req.params
        const songIndex = parseInt(index, 10)

        const song = playlist.playSong(songIndex - 1)

        if (song) {

            res.status(200).json({ 
                status: 200,
                message: "Playing...", 
                song: songIndex, 
                data: song });
        } else {
            res.status(400).json({ 
                status: 400, 
                error: 'Bad request', 
                message: 'Invalid song index' });
        }
    } catch (error) {
        throw new Error(error.message);
    }
    
})

// get all (playlist)
app.get('/songs', (req,res) => {
    try {
        const songWithIndex = playlist.songs.map((song, index) => ({
            index: index + 1,
            title: song.title,
            artists: song.artists,
            url: song.url,
            playCount: song.playCount
        }));
    
        res.status(200).json({
            status:200,
            message:"success",
            playlist: songWithIndex
        })
    } catch (error) {
        throw new Error(error.message);
    }
    
})

// get (sorted song by playCount)
app.get('/sorted-song', (req, res) => {
    try {
        const song = playlist.getSortedSongsByPlayCount();

        const songWithIndex = song.map((songs, index) => ({
            index: index + 1,
            title: songs.title,
            artists: songs.artists,
            url: songs.url,
            playCount: songs.playCount
        }))
        res.status(200).json({
            status: 200,
            message: "success",
            song: songWithIndex
        });
    } catch (error) {
       throw new Error(error); 
    }
    
})

// error handling when client try to wrong path
app.use((req, res) => {
    res.status(404).json({
        status: 404, 
        error: 'Not found', 
        message: 'The requested path does not exist'})
});

const port = 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

