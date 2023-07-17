class Song {
    constructor(title, artists, url) {
        this.title = title
        this.artists = artists
        this.url = url
        this.playCount = 0
    }
}

class Playlist {
    constructor() {
        this.songs = [];
    }

    addSong(title, artists, url) {
        
        const song = new Song(title, artists, url);
        

        this.songs.push(song);
    }

    playSong(index) {
        if (index >= 0 && index < this.songs.length) {
            const song = this.songs[index];
            song.playCount++;
            return song;
        }

        return null;
    }


    getSortedSongsByPlayCount() {
        const sortedSongs = [...this.songs];
        sortedSongs.sort((a, b) => b.playCount - a.playCount);
        return sortedSongs;
      }
}

module.exports = Playlist;