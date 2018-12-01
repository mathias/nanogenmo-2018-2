const _ = require('lodash')
const tracery = require('tracery-grammar')
const fs = require('fs')

const adjectives = JSON.parse(fs.readFileSync('corpora/data/words/adjs.json', 'utf8'))['adjs']
const adverbs = JSON.parse(fs.readFileSync('corpora/data/words/adverbs.json', 'utf8'))['adverbs']
const animals = JSON.parse(fs.readFileSync('corpora/data/animals/common.json', 'utf8'))['animals']
const colors = JSON.parse(fs.readFileSync('corpora/data/colors/crayola.json', 'utf8'))['colors'].map(function (obj) { return obj.color })
const nouns = JSON.parse(fs.readFileSync('corpora/data/words/nouns.json', 'utf8'))['nouns']
const verbs = JSON.parse(fs.readFileSync('corpora/data/words/verbs.json', 'utf8'))['verbs'].map(function (obj) { return obj.present })

let flattenVenues = function(json) {
  return _.reduce(json, (memo, obj, key) => {
    if (_.isArray(obj)) {
      return memo.concat(flattenVenues(obj))
    } else if (_.isObject(obj)) {
      if (_.has(obj, 'categories')) {
        return memo.concat(flattenVenues(obj.categories))
      } else if (_.has(obj, 'name')) {
        memo.push(obj.name)
      }
    }
    return memo
  }, [])
}

const venuesJson = JSON.parse(fs.readFileSync('corpora/data/geography/venues.json', 'utf8'))
const passagesJson = JSON.parse(fs.readFileSync('corpora/data/architecture/passages.json', 'utf8'))['passages']
const locations = flattenVenues(venuesJson).concat(passagesJson)

const allFirstNames = JSON.parse(fs.readFileSync('corpora/data/humans/firstNames.json', 'utf8'))['firstNames']
const allLastNames = JSON.parse(fs.readFileSync('corpora/data/humans/lastNames.json', 'utf8'))['lastNames']
let characterNames = _.sampleSize(allFirstNames, 4)

const mainCharacter = _.sample(allFirstNames)
const mainCharacterLastName = _.sample(allLastNames)

const moodsJson = JSON.parse(fs.readFileSync('corpora/data/humans/moods.json', 'utf8'))['moods']
let emotions = moodsJson.concat([
  'sad', 'happy', 'angry', 'jealous',
  'fear', 'anger', 'sadness', 'joy', 'disgust', 'surprise', 'trust',
  'anticipation', 'friendship', 'shame', 'kindness', 'pity',
  'indignation', 'envy', 'love'
])
let sounds = ['chirp']
let directions = ['up', 'down', 'left', 'right', 'north', 'south', 'east', 'west']
let weathers = ['rain']

let presentTimes = [
  'tomorrow', 'tonight', 'today'
]

let relativeTimes = [
  'morning', 'night', 'evening', 'afternoon'
]

let sentences = [
  'The #noun# lay in a little #location#.',
  'It had no need of #emotion#.',
  'The evening slowly turns to #adjective# and the #noun# chips at the sky, making #sound#.',
  '#characterName# might never have discovered the #noun#, had it not been for the #noun#.',
  'Never before had #characterName# #adverb# seen a #noun# with #adjective# #noun#.',
  '#characterName# had to #verb# the #noun# of their #noun# and #verb# a #characterName# or two.',
  'A #noun# stands at the top of the #noun#, like a #adjective#, #color# #noun#.',
  'Very well.',
  'We knew we had no other #noun# but to go #direction# at all attainable speed.',
  'A #adjective# #weather# had fallen in the #relativeTime#, and #relativeTime# brought the #noun# to #weather# proportions.',
  'Our #noun# was wet through.',
  'The great #noun# separated us from our goal, we know.',
  'We were in danger of destruction at any #noun# and #noun#.',
  'My idea was to #verb# along #noun# whenever it was possible.',
  'All are agreed that our progress has been good.',
  'We saw no #noun# today.',
  "I managed to transfer a #noun# from #characterName#'s pack to my own.",
  'We #verb#.',
  'The #noun# stood in the trail directly ahead.',
  'The #noun# tossed back his #noun# and laughed a laugh.',
  '"#verb.capitalize#? #verb.capitalize#?" cried one of the #adjective# #noun# on the #location.',
  'But when #characterName# had left them far behind, a #noun# engulfed them.',
  '#characterName# fondled the #noun# liveingly as he #verb#ed away down the #noun#.',
  'Yesterday we were set upon by #adjective# #adjective# #noun#s. Two we shot at.',
  'In the evening we held our #noun# on the best #noun# by which to defend ourselves.',
  '#verb.capitalize#ing seemed to be the only practical method of defense.',
  'We decided, at last, to arm ourselves with #noun#s.',
  'The hours passed without #adjective# incident.',
  'He is #adjective#, with big, #adjective# hands.',
  'His shoes are in #adjective# condition',
  'I asked him about himself; he was #adjective#.',
  'His shoes are worn; his feet have obviously done many #noun# in them.',
  '#characterName# started calling them #characterName#, and since we know no other name, that it will be.',
  'The forest was #adverb# #adjective# in the #relativeTime#.',
  '#noun.capitalize# of innumerable varieties gladdened our hearts.',
  'We stopped to eat under a #noun#.',
  'I was seized with an impulse to #verb#.',
  'I shared my #noun# with #characterName#, whom I distrust and despise.',
  'He took the #noun# in his fingers eagerly enough.',
  'The knowledge that we are being followed is like a #noun# that we are forced to #verb# each other with.',
  'We have a #adjective# fear of our own species.',
  'There was a low #noun# ahead of us as we set out #presentTime#. #noun.capitalize#?',
  'Just as I got started on my journal last #relativeTime#, #characterName# came into my tent and seemed #adjective# to leave.',
  'Why am I self-conscious when writing about #characterName#?',
  'Finally she said, "Do you remember the first time we met?"',
  'I didn\'t ask why, I went out into the #relativeTime# and walked across the #location# to the fire where the others were gathered.',
  //'"I shot #characterName#", he said. I didn\'t ask why.',
  'I didn\'t ask why.',
  'I said he would live, and kneeling, unlaced his #noun# and took them off.',
  'Having done what I could for him, I went back to the tent.',
  'There is talk of abandoning #characterName#.',
  'Three words he repeats over and over again in this delirium: #noun#, #noun#, and #adjective#.',
  'The #noun# in the distance has ceased.',
  'It will be good to leave the #location#.',
  'I have not been able to determine where #characterName# got the #noun#.',
  '#characterName# will say nothing, of course.',
  'What has become of the #noun#? It is almost #adverb# quiet.',
  'I found a baby #noun# in a #location#.',
  'I saw #characterName# for a few minutes alone this afternoon. #characterName# has been in almost constant attendance with him.',
  '#characterName# smiled when I told them I was sorry.',
  'He has learned very quickly with us.',
  'Yet I could not bring myself to tell about #characterName#.',
  'We should be able to move on #presentTime#.',
  '#characterName# is still not well enough for travel.',
  'Besides, #characterName# has disappeared from the camp.',
  'Our loudest shouts served only to acquaint us with a troubling fact: the #noun#s have not given us up.',
  'Our #noun# brought them #verb#ing to the very fringe of the #location#.',
  'How will #characterName# manage to get back?',
  'I have been lying here on my back in the #location#.',
  //'It is late  and #relativeTime# and the shadows pass and repass over this paper.',
  'How naked I feel under the #noun#.',
  '#characterName# says that the others have learned of my journal.',
  'She thinks that I am in danger from them.',
  'Poor #noun#s, they do not realize with what effort of will I am trying to save them.',
  'But I must be quiet within myself.',
  'Who has bettered the statement of #characterName#?',
  'Have you counted your #noun# this morning?',
  'I am angry today.',
  '#characterName# insists on reading Shakespeare to #characterName#.',
  'I have thought it over.',
  'What do you care?',
  'The whole thing is somehow #adjective# anyways.',
  'Don\'t be a #noun#, be a #noun#.',
  'The point is, I think, how many #noun#s have you got?',
  'These things are important.',
  'We moved on today.',
  'Our supply of #noun# is on the wane.',
  'We should be out of the #location# by tomorrow.',
  'I saw a #noun# this #relativeTime#, its #noun# sharp against the sky.',
  'How beautiful are these #noun#, the #color# #noun#, #color# #noun#, and #color# #noun#.',
  'About mid-day we decided to take advtange of the opportunity for a #verb#.',
  '#characterName#, once champion heavyweight boxer of the world, was first.',
  '#characterName#\'s eyes never leave the #noun#.',
  '#characterName# paid me a visting in the #relativeTime# and I asked them how they managed to get back to camp despite the #noun#s.',
  'He refused to speak about this, but he did say that an #adjective# woman in the #location# had warned him of great danger.',
  'The question is not: do we believe in #noun#? but rather: does #noun# belive in us?',
  'And the answer is: only the #noun# could have created our image of #noun#.',
  'All last #relativeTime# our #noun# was in uproar.',
  'There was no #noun#.',
  'Why should the #noun#s follow us with such persistence?',
  'We buried him beneath the #location#, and on a piece of #noun# printed his name.',
  'What a sorry kingdom was his.',
  'The first communication from #noun#!',
  'He gave warning of an exact, definite #noun#.',
  'We have come at least to an #adjective# #location#.',
  'We have come at least to an #location# where we may rest and refresh ourselves.',
  'Provisions are brought down the #location# by #noun#.',
  'We plan to remain here for a time.',
  'By great good fortune, my room adjourns that of #characterName#.',
  'There is something horrible.',
  'Suppose for a moment you are a #noun# looking at me.',
  'I will not #verb# you.',
  'A #noun# passes.',
  'Just over the #location# they are waiting.',
]

let grammar = tracery.createGrammar({
  'adjective': adjectives,
  'adverb': adverbs,
  //'animal': animals,
  'characterName': characterNames,
  'color': colors,
  'emotion': emotions,
  'location': locations,
  'noun': nouns,
  'sound': sounds,
  'verb': verbs,
  'direction': directions,
  'weather': weathers,
  'presentTime': presentTimes,
  'relativeTime': relativeTimes,
  'origin': sentences
})
grammar.addModifiers(tracery.baseEngModifiers)

//console.log(grammar.flatten('#origin#'))

// Generating dates for journal entries:
let currentMonth = 'May'
let currentDate = 2

let nextDate = function() {
  let s = `${currentMonth} ${currentDate}`
  if (currentMonth == 'May') {
    currentDate += _.random(1,3)
    if (currentDate > 31) {
      currentDate = 1
      currentMonth = 'June'
    }
  } else if (currentMonth == 'June') {
    currentDate += _.random(1,3)
    if (currentDate > 30) {
      currentDate = 1
      currentMonth = 'July'
    }
  } else if (currentMonth == 'July') {
    currentDate += _.random(1,3)

    if (currentDate > 31) {
      currentDate = 1
      currentMonth = 'August'
    }
    return s
  } else if (currentMonth == 'August') {
    currentDate += _.random(1,3)

    if (currentDate > 31) {
      currentDate = 1
      currentMonth = 'Unknown Month, Day'
    }
  } else {
    currentDate += _.random(1,3)
  }
  return s
}

let output = ''
let sentenceCount = 1
let paragraphCount = 1
let chapterCount = 1

const maxWords = _.random(50000,60000)

output += `# The Journal of ${mainCharacter} ${mainCharacterLastName}\n\n`
output += 'Matt Gauger <matt.gauger@gmail.com> - NaNoGenMo 2018\n'
output += 'https://github.com/mathias/nanogenmo-2018-2 for code\n\n'

output += `## Chapter 1\n`
output += `${nextDate()}\n\n`
output += `We set out. `

while (output.split(' ').length < 50000) {
  output += grammar.flatten('#origin#') + ' '

  if (sentenceCount > _.random(4,8)) {
    output += '\n\n'
    sentenceCount = 1

    if (paragraphCount > _.random(4,20)) {
      paragraphCount = 1
      chapterCount++
        output += `## Chapter ${chapterCount}\n`
      output += `${nextDate()}\n\n`
    } else {
      paragraphCount++
    }
  } else {
    sentenceCount++
  }

}

console.log(output)

let count = _.clone(output).replace(/\n/, ' ').split(' ').length
console.log(`\n${count} words.`)
