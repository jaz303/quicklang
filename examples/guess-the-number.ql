io println:"Guess the number game!"

5 times:[

	io println
	io println:"Next question..."

	x := random intBetween:1 and:100
	ongoing := true
	guesses := 0
	
	[ ongoing isTrue ] whileTrue: [

		guess := (io readlnWithPrompt:"Enter your guess: ") toInteger

		guesses := (guesses inc)

		[ guess lessThan:x ] ifTrue: [
			io println: "Higher!"
		]
		
		[ guess greaterThan:x ] ifTrue: [
			io println: "Lower!"
		]
		
		[ guess equalTo:x ] ifTrue: [
			io print: "Correct! number of guesses: "
			io println: guesses
			ongoing := false
		]

	]

]
