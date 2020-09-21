/**
 * Created by ignat on 05-Jan-17.
 */

const StoryblokClient = require('storyblok-node-client')

let Storyblok = new StoryblokClient({
  privateToken: 'LYrOhTLps6QbbreRceQ7iAtt',
  cache: {
    type: 'memory'
  }
})

exports.Storyblok = Storyblok;