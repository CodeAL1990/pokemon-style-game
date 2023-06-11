# pokemon-style-game

Added basic game assets
Open tiled map editor
Create 70 by 40, 12px each game map
Select and highlight water tile (9x9), select random(dice) and fill tile(bucket) and fill map with water
Water will be our base layer where all other layers will stack on it
Rename tile to Water
Create tile layer 2 and rename it to island
In this layer we are placing land on top of the water
Pick the land mass that has a water border(to indicate that land is on water) and put it on the map
On this land mass, pick a tile on the island and expand it upwards
Pick the middle left border(because it is optimized to be connected), and expand the left border
Do the same for the right
With both sides done, practice using the top side of the land mass border
Remember the corners of the land mass are always different as they are connecting between corners and thus have a different shape
The green tile has some grass portion tilesets for the outward-most tiles, use those(remember there are middle and corner tiles) and fill the edges up
Expand this 'island' land mass as much as you like
Moving on, we will be placing a plateau on top of the island you just create
Create tile layer 3 and rename it to Plateau
Now take the land mass with grass borders and place on top of your island
Trim it down to fit the island so your character could visibly move without obstruction
Create tile layer 4 and rename it to House
Now place a house in an empty space
You should be running out of space now
You can click island, highlight(right click and drag or use the rectangle tool) a portion of the map you wanna expand, hit control + c, and replicate that portion
With your island expanded, you can create tile layer 5 and rename it to Trees
Notice when you layer your trees in the same tileset, the empty spaces you highlighted from the tileset.png removes parts of the tree when you try to stack them
To layer the trees you want to put them in different tile layers
So you could name the upper layer Trees 1, and the rest trees 2 and so on to layer them properly and give them a 'dense' feeling
Now we want the path from the entrance of the house to the stairs of the plateau
Create a new tile layer and rename it to Paths
You have sand paths and grass with sand edges
Use sand paths to pathways, and the grass with sand edges to make the sand paths 'merge' with the grass
With the path done, add a new tile layer and rename it to battle patch
These dark grass will be where battles happen randomly when a character walk through them
With the patch done, add a new tile layer and rename it to Grass and Flowers
Highlight, randomise them and place them on the green tiles
After Grass and Flowers, add another layer and call it Fence
After Fence, do another layer called Dock(with the boat)
We will now deal with collisions which will dictate borders character cannot move pass
Download collision.png(just a red tilebox) and place in your Game Asset folder
Create a new tileset in your map editor for this collision image just like your asset png for your 12x12 tileset
Now, add a new tile layer called Collisions
In that layer, you can place the red squares in areas you think the players should not be able to move on
With your collision areas done, we will now deal with foreground layers
Notice that for your house, your character should be able to walk behind the house and not get block by the rooftop that is protruding upwards
Add a new tile layer called Foreground Layers
In that Foreground layers tileset, you want to place all foreground elements(such as that protruding rooftop) ONTO ITSELF(i.e you click house layer, copy that protruding roof area, go to Foreground layers, and paste that onto that protruding roof area again)
These foreground layers will be placed on top of your characters later down the road(very much later me thinks), so when a character walk pass these foreground layers, it will create the effect that the character is walking behind these foreground layers
Other foreground layers include that top bit of your fence, top bit of your trees, TOP BIT OF WHATEVER YOUR CHARACTER WALKS BEHIND etc
Now we are going to expand the whole island so it looks like an island(you can use the author's map or create your own)
With the island and collisions done, time for html, css, and js
In your html file, create canvas tag inside the body, link the appropriate files, and link canvas from html to js
In the js file, set canvas width and height to 1024 and 576 respectively
Test your canvas out with fillStyle for color and fillRect to check out the space your canvas is taking
Create an instance of your island image and link the source
If you apply drawImage on your canvas' context now, your image will not appear on canvas because it has not yet loaded
Instead, use onload built-in function on your island image and assign the arrow function to it, then use the drawImage method on context
The image you want on your canvas is the image the player will want the size of the game to be in
So, in your map editor, zoom in until the size that you think is best(400% is the one being used here)
Once zoomed to the appropriate size, export that image and your canvas should show whatever your drawImage has drawn and at what position
To move image left(x axis), it's negative and vice versa
To move image up(y axis), it's negative and vice versa
Once your island image is positioned correctly(starting image), move on to player
Create playerImage and create an instance of Image, and link it
\*\* Author used the onload on island, and inside the same onload, he also used drawImage on the playerImage, does not work for me, so i used window load event listener instead
You can adjust the player position to the center in drawImage using half of the canvas width and height and half of the playerImage's width and length(or you can manually adjust them both on your own)
The author centers the playerImage first using the canvas and playerImage, then manually adjusted the island image to fit the player(seems to do better than manually adjusting for both)
Note that you are centering the WHOLE playerImage sprite sheet to the center, not a single sprite
You are currently on using 3 parameters in drawImage(presumably)
To crop out a single sprite, you will use all 9 parameters
Once the above is done, your sprite will be out of position(since you center the image in drawImage using the whole sprite sheet)
However, you do not need to manually center the current cropped sprite now, but instead just divide the offset of the playerImage in dx and dy by 4(or multiply by 0.25)
Then, you will need to half the offset further to get the player sprite perfectly centered on the starting area(you can just multiply it by 0.125 instead of 0.25 multiply by 0.5)
We will now create directions for your character
Add a keydown event listener for window and pass event(or e) in the callback function, console.log e.key to see that you are getting the keys when pressing anything on the keyboard
Add a switch statement for e.key and we will use wasd for directions
Add cases in the switch statement for wasd(remember to add break for each of them)
Now create an animate custom method with requestAnimationFrame method on animate
To animate the images you will need the drawImage methods but putting it in the animate method will require too many variables(due to hardcoded parameters present in the drawImage).
As such, we will need classes to make the code easier to manage
Create a class Sprite, and in the constructor you will wrap all your references as an object(this is different from the sidescroller where you do not convert the references into an object, the reasoning here is because an object do not require the references to be in order, making it easier to code(?))
The references will be position, velocity(not yet made), and image
Convert the position and image into class properties
Create custom draw method and move the drawImage with 3 parameters(the background) into the draw method(remember to use this keyword for image now because you are now inside the class)
For the parameters, you will be referencing the image class property now, and for xy, instead of having hardcoded numbers, you will reference x and y position of background variable which we will now create
Inside the class, create background variable and call a new instance of Sprite, and inside it pass its position(position will be an object with x and y coordinate properties) and image
Now call the draw method on background inside animate, and move the drawImage with 9 parameters(player), after the draw method, and call animate to trigger animate function
\*\* For the image class i used island
We will try and make the character 'move' now
To move it, you will need make use of the directional keys you created previously (wsad switch statement in keydown event listener)
Create a keys variable and assign wsad as an object each and set property to false for each of them
Then, in the keydown event listener, instead of console.log, set the properties of pressed inside keys variable to true when wsad are pressed
console.log keys after the keydown event listener and you should see your wasd's pressed properties turning from false to true when pressed
You want them to become false when you let go of your keys so you will create a keyup event listener for wasd, similar to the keydown event listener, but instead pressed properties become false when keyUp
In animate, set a condition that if keys w pressed property is true, add background position y with a positive value(moving the island image downwards when pressing w, making the character 'move' in the opposite direction(up in this case))
Remember your hardcoded values of xy in background's drawImage needs to reference the background variable position properties or the hardcoded values will prevent your character from 'moving'
If you console.log after the condition in animate, you should see y position constantly being added and thus move downwards, giving an illusion that your character sprite is moving upwards
Once you can 'move' up, add the conditions with else if for the rest(asd) with the appropriate addition or substraction for the direction
Note that when moving in any direction, when simultaneously pressing 2 or more directional keys, you 'move' in a random direction which is not ideal
You want the character to move to the direction of the lastKey being pressed(diagonal movements excluded for now)
To do that you will need to listen for the last key that is pressed
Create a lastKey variable before keydown event listener and set it to an empty string(or nothing)
In each case, set the lastKey variable to that key to denote that was the lastKey being pressed
In the conditions in animate, add an AND operator for each and check if the lastKey being pressed is true for each key(i.e if w is the lastKey for w, a for a etc)
Now, we want to bring the collisions you made into the folder
In tiled map editor, make collisions visible in your map and export it as a JSON file anywhere
In that JSON file, find collisions and above it, copy the full array and paste it in a new js file in your project folder(you can place it with your main folder or create a new folder for it(i shall put it inside the Game Assets along with the rest))
Name that array collisions in your new js file
Import the new js file into your html
Be mindful of syntax errors since the array is huge
Console.log collisions in your main js file and you should see it in your console
Remove the fillStyle and fillRect for your background(because you do not need them anymore)
Use a for loop with the limit of collisions.length and increment by 70(because map width is 70), and in that for loop, use slice on collisions array from 0 to 70
You don't really want to just slice 0 to 70 every iteration but continually through the array
Since you are incrementing i by 70, i is essentially a +70 every iteration
As such, instead of 0 you can replace it with i because first iteration it will start as 0 and second 70 third 140 and so on
For the 2nd argument you need in the slice method, you can add i to 70 to follow the incrementation as well
You will need to store the calculation of your for loop inside an array so create a variable called collisionsMap and give it an empty array
Inside the for loop, use the push method on collisionsMap array and pass the slice method you did before into it
console.log collisionsMap after the for loop to look at the arrays you have made
You should get an array and inside it a bunch of subarrays with 70 array items that visually matches how your collisions look like in the map
Now, create a class called Boundary(to differentiate from collision variable name), and pass the position reference in
Convert position into a class property
For the width and height, since we imported 400% the scale of the original map, you will need to use 400% of 12px, so 48px
\*\* In this course, author likes to place all references in classes inside an object so he does not need to reference them in order
Create custom draw method in Boundary and use fillRect method on the canvas inside it with its position's x, position's y, width, and height
Use fillStyle and the canvas as well and give it red to give a visual indication
Outside the Boundary class, create boundaries variable and assign it an empty array
You are going to loop through the array with subarrays from before, so you will need to use forEach method on collisionsMap array and inside this array you are going to use another forEach method loop to loop through the subarrays
So for each row in the collisionsMap array, you will use a forEach method for each symbol in the row array(row and symbol are arbitrary names)
console.log symbol after the arrow function for symbol and you should see that your array is deconstructed to single array items
Remove that console.log and use a push method on boundaries array, passing it an instance of Boundary and the object reference of position and the xy coordinate
Give xy 0 for now
In each row and symbol, you want to place the xy positions based on indexes on the row and symbol's location
Add an additional argument, i, in with row to indicate its indexes
Do the same for symbol but give it j to represent its indexes
i will loop over the subarrays(so each subarray is an item for i)
j will loop inside the subarrays(so each array item inside the subarray is an item for j)
In canvas, each row of 70 items will be stacked on top of each other so assigning i to y coordinate will match the rows when looping through collisionsMap array
You know the height is 48 so multiply i by 48 for its position
Similarly, x will have the position of j multiplied by the intended width, 48
To be clearer in your code instead of using hardcoded numbers, you can use static keyword above your constructor in Boundary and assign the width and height of 48 to them
Then, instead of multiplying by 48 inside the forEach method, you can multiply by Boundary's width and height in x and y respectively(using 48 is technically incorrect here since the width and height of 48 in Boundary's properties are not used until the instance of Boundary is created in the push method inside the forEach method and the 48s in the push method are standalone numbers with no relation to Boundary's properties)
console.log boundaries array and you will see you are creating an instance of Boundary on every item inside the collisionsMap array(because we did not look for the item we want to draw Boundary on which is 1025s and not the 0s)
So, add a condition before the push method where symbol equals to 1025 is true, then push it into the boundaries array
In your background variable, instead of using hardcoded values for xy positions when creating Sprite, create an object called offset and place the xy values in that object
After the above, inside the new instance of Sprite, replace the values with the offset's x and y properties
Move the offset object above collisionsMap forEach method because you want to use those properties inside the method
Inside the x and y properties in the forEach method(s), add the offset to both of them
In animate, use forEach method on boundaries array and for each boundary, call the draw method on it
\*\*Forgot to create a new instance of Boundary in the forEach method for collisionsMap and row(got a TypeError for boundary.draw())
Above animate, create a testBoundary variable and instantiate Boundary with a position properties of x and y of your choice(400, 400 in this case)
Inside animate, comment out the forEach method for boundaries and call draw on testBoundary
Notice when you move your character the testBoundary moves with you
To prevent it, you are going to move it together with your background in your inputs
In your conditions for each key presses, add or minus testBoundary's positions accordingly alongside the background so they move together(you will need parenthesis now since you have more than one line of outcome)
Now, instead of writing the same lines of code for background and testBoundary, we should put them in a variable and extract their info from this variable
Create a variable called movables, assign an array to it and add background, and testBoundary as array items
Then, back to the input and lastKey conditions, instead of writing the 2 lines of code, use the forEach method on this newly created movables variable array instead, and for each movable, increase position of y by 3(same as before but you are applying to a variable that has the previous variables as array items)
This way, when you have other variables that need to move alongside the background, you can just add it to movables to sync them
Do the same for the other 3 inputs after your input you have refactored is working
We want to refactor drawImage for playerImage because we are unable to reference any of the character's dimensions since we are drawing it directly inside animate function
Move the drawImage method from animate to Sprite's draw
Once you are inside the class, you cannot reference the global variable now and you will need to reference it from your class' properties(image in this case), so change all playerImage to image with the this keyword
Remove the previous drawImage method inside draw and you should see it is all messed up and the player is missing(since we never created a player class)
Looking at your drawImage parameters for sw, you divided it by 4(or multiplied by 0.25) because the parameters were used to draw your player image but now placed inside Sprite class which affected your background
As such you do not want to divide image width by 4 for background but by 1 to use the full width instead
But since the Sprite class is now used for background and character, how do we make drawImage fit for both?(\*\*I'm not sure why author did it this way instead of separating player and background but whatever)
Since the 4 in sw represents the 4 sprites in the image file, we can add a new reference called frames and convert it to a class property
Then, instead of dividing the image's width by 4 or 1, we can just divide it by frames' max property(assign it in the frames reference as an object, giving max a default value of 1)
For dx and dy values, those are only for your player's sprite, so cut them and move them out of the class(comment them out for now)
To replace dx and dy, you want dx to be the position of x and dy to be position of y
For dw, it's the same as sw, so instead of dividing by 4, divide the width by the max property of frames
You should now get back your background starting location after the refactor without your player
Now, create a new variable called player and add a new instance of Sprite, passing it position object with x and y properties
The x and y refers to the cut out calculations you had previously in drawImage because those are specifically for your player sprites
Place them inside x and y respectively but since you are outside the Sprite class now, this keyword will not work now
Using playerImage will have some delays since the code is being ran right away when the file is loaded
Instead, just use hardcoded values of the width and height of the sprite sheet for now(192x68)
After changing the above, call draw on player in animate after testBoundary's so player sprite will go above testBoundary's red blocks
You will get all 4 sprites because you are using the full sprite sheet
To use only one, you will need to add the frames object in player and set max to 4
This way, your player variable will reference the frames parameter in Sprite class that and max has a default value of 1 so the new instance of sprite created inside player variable will be divided by 4
Test your inputs out and your background and player should work just like before it got messed up
Now that we have a player variable, we can now reference its position to test for collisions with the red blocks
In animate, set a condition where if player's x position plus its width is greater than or equal to testBoundary's x position, console.log colliding text, to test if player sprite will be stopped when it touches the left side of the testBoundary object
This will not work because becaues we do not have a player width in Sprite class
Inside Sprite class, you will need to create width and height properties
We actually want the width and height values you placed in sw, sy, dw and dy, but since they are in the draw method we cannot make use of them
As such, set width to the image's width divided by frames' max and height to image's height
You want the image to load first since you will need it to load before the calculation of width and height can be done, so use built in onload on image with the arrow function, and once it loads, execute the calculations of width and height
Return back to your console and if your character is on the right side of the testBoundary block, you should see the colliding text shoot up since the condition is fulfilled. Move it to the left and the console log should stop running
Back in draw, since we have moved the calculations of sw, sy, dw, and dy to width and height class properties, you can replace the calculations inside drawImage to width and height instead
Now that the left side of the collision is working, we shall do it for the right side
In animate, add an AND operator for the collision condition(Add a collision detection section in animate and put the condition in) and check if player's x position is less than or equal to testBoundary's x position plus its width, then collision happens
Now, touching the left and right side of testBoundary(since you have not put a condition on top and bottom, the condition covers the whole height of the canvas), will invoke the colliding message
To accomodate the top and bottom of testBoundary, check for player's y position is less than or equal to testBoundary's y position plus its height for top
For bottom, check if player's y position + its height is more than or equal to testBoundary's y position
With conditions for top, bottom, left and right, you should only trigger the colliding message when touching either sides of the testBoundary object
To make the code more legible, we will now create a custom function for collision between player and testBoundary
Create rectangularCollision function and pass in rectangle1 and rectangle2 inside an object as its argument
Inside the function, return the 4 conditions for collisions you wrote in animate(move them in and change player and testBoundary to rectangle1 and rectangle2 respectively)
Now, instead of checking for the 4 conditions inside the if statement in animate, you will call rectangularCollision, assigning player to rectangle1 property, and testBoundary to rectangle2
\*\*Honestly this probably makes it worse, should just move them to different files and do import/export
All in all, the code should work the same after the refactor
Once the code is working, you want to apply it to not 1 boundary block but all boundaries in your map
So uncomment your forEach method for boundaries array and move the collision detection code inside it to apply to all boundaries
For rectangle2, you will need to change it to the callback variable you are using(boundary in this case) instead of testBoundary
Remove all testBoundary related code(the variable, the draw call, the array item inside movables)
Inside movables, you want the boundaries array but having an array inside an array, your code will be unable to read it
So use the spread operator on boundaries inside movables array to flatten it
Now, when player touches any collision block the colliding message should go off
With the above done, we will now make it so that the player will not be able to go pass a boundary
To detect when player is colliding with a boundary, you will detect it when player is pressing inputs and player collides with a boundary
To do this for all boundary blocks, you will need to loop through them
You cannot do this with a forEach loop so you will need to use the more conventional for loop in under the inputs section for each individual directional input
So, for w(up) input, use a for loop with boundaries.length limit, increment i, and in the loop, move the condition in the forEach loop that calls rectangularCollision inside the for loop
With that condition inside the new for loop, you will not have access to boundary callback variable now in forEach, so create a variable inside the for loop called boundary and assign it the boundaries array at i index
Additionally, you will need to 'predict' into the future if player and boundary is going to overlap
You know that you are moving player at 3 pixels in all directions, so for w(up) input, wrap the boundary property for rectangle2 with curly brackets(turning it to an object) and use the spread operator on it to create a clone of the boundary and not override the original
With the clone done, you will add a position object item alongside spreaded boundary, with x and y properties, with x property remaining the same at position x of boundary but y property 'predicting' the 3 pixels movement upwards for the w input, thus adding 3 to y position of boundary
Colliding player with a boundary now will log the colliding message out and stopping immediately when you stop pressing w input
You want to stop the movement of the player altogether when the first colliding message logs out
Since we are using all the boundary objects in the for loop, javascript will detect the collision between player and the other objects to be false(since player will only be colliding with 1 or 2 tiles at most) thus we want to break out of the loop when the first collision happens
Outside the condition for w input, create a variable called moving and set it to true
After the rectangularCollision condition in w input, and colliding message console log, set moving to false and add a break statement
For the other input conditions to happen, you want moving to be true so set a condition when moving is true, then the other inputs can occur
Now hold w input and you should see that you cannot go pass a boundary, pressing other inputs will allow you to move to show the moving condition works
With the above done, apply the for loop up to and including the condition when moving is true(minus the console.log) for each other inputs, and change the 'prediction' for x or y accordingly in the other inputs base on their direction
\*\*\Had to adjust my player's position abit because its starting location clipped boundary and i was not able to move
To 'remove' the boundary blocks visually, go to your fillStyle of red in Boundary draw, and change it to rgba of red with 0 opacity
With collisions sort of done, we want to deal with foreground objects
In your map editor, make only your foreground objects as the visible layer and export it as foregroundObjects image in your project folder (remember to scale it to 400% like your game map)
Go to your background variable with the new instance of Sprite
Copy and paste the background variable, creating a second set and rename background to foreground
Now is probably a good time to move classes away from this js file because your code is all clogged up
Create classes.js and move all your classes in
Now, link the classes.js file inside your html(above your main js file so your main js file have access to it)
\*\*Author did not save his files at this point so he did not realise he cannot reference context from his main js file now
With foreground variable done, create foregroundImage and give it a new instance of Image and link it to your foregroundObjects image
For your foreground variable, change the image property to foregroundImage you just linked
You want to render your foreground as the last layer so call the draw method on it after background and player draw calls in animate
You will want to add foreground to your movables array so it moves with the background
\*\*Had to remove my window load event listener when moving the classes to a different js file
With your foreground code done, player should be able to move behind objects you determined to be foreground and give user an illusion that it is 'behind' the foreground object
\*\*I might edit some trees in to create more foreground illusions
