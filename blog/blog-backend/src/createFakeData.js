import Post from './models/post';

export default function createFakeData() {
  const posts = [...Array(40).keys()].map((i) => ({
    title: `포스트 #${i}`,
    body: `The Project Gutenberg EBook of The English Novel, by George Saintsbury

        This eBook is for the use of anyone anywhere at no cost and with
        almost no restrictions whatsoever.  You may copy it, give it away or
        re-use it under the terms of the Project Gutenberg License included
        with this eBook or online at www.gutenberg.org
        
        
        Title: The English Novel
        
        Author: George Saintsbury
        
        Release Date: December 26, 2004 [EBook #14469]
        
        Language: English
        
        Character set encoding: ISO-8859-1
        
        *** START OF THIS PROJECT GUTENBERG EBOOK THE ENGLISH NOVEL ***`,
    tags: ['가짜', '포스트'],
  }));
  Post.insertMany(posts, (err, docs) => {
    console.log(docs);
  });
}
