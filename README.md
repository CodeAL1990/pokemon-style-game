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
\*Editted some trees in to create more foreground illusions
Instead of a static player sprite, we will now animate it
In Sprite draw, there are hardcoded 0s in sx and sy which represents the first frame of the sprite sheet
Since we only have 1 row of player sprites to animate, sy will not be touched here
To track the frame our sprite is currently on, we want to iterate the by the width of each sprite(48px, 96px etc) in sx
The frames object in Sprite has 1 property: max, inside the constructor
If we want to add another property to it, we will need to wrap the conversion into an object, spread it, and you can place a comma to add whatever property you want to frames object
In this case, we give it a val which stands for value(value is a reserved variable for javascript) property set to 0
In sx, you reference the val property in frames(this.frames.val)
Increment this value property after the drawImage method(but still inside draw) under the condition that it only happens when frames' value is lesser than frames' max - 1(because max is 4 but javascript starts from 0 so you will draw out an empty frame before reverting back to 0, thus you want to end it at 3)
Else(when it is greater than max), set frames' value back to 0
Back in sx, you want to multiply the reference by the width(48px) of the sprite which you have calculated in properties
Now, you should see your character animating but it is too fast because it is animated on each frame
We will want to animate the next frame of the sprite sheet after a certain number of frames have passed(we use 10 as an example)to slow down the animation speed
To do this, add another property to frames object in Sprite called elapsed and set it to 0
In Sprite draw, before the condition between val and max, set a condition when frames' max is more than 1, increment frames' elapsed
Back to the previous condition between val and max, add a pre-condition where if frames' elapsed is 0 whenever its value is divided by 10(using modular operator), invoke the val and max condition
You should see a more comfortable animation speed for your sprite
We want to move player when a key is pressed/inputted
Add a property in Sprite called moving and set it to false
Before the elapsed condition, add a condition where if moving is false, just return it(you could wrap both elapsed and val and max conditions in another if statement to check if moving property is true as well)
With the above done, move to the input section in your main js file to apply the logic
In the w input condition, set player's moving property to true at the start
The sprite will not move at the start but once it moves with w input, it will not stop even if you let w go
To prevent this, you want to set player's moving property to false by default outside the condition
Once your player move when w is pressed and stops when w is released, you can set player's moving property to true for the rest of the directional inputs
With the above done, you would want to reference the correct player image for each direction
In Sprite, reference sprites in constructor and convert it to a class property
In your main js file, when creating your player, you want to add a sprites object inside the new instance of your Sprite and add up,down,left,right properties to it, referencing each image associated to each direction
You will need to create the remaining player images just like your playerImage(You can rename it to playerDownImage now to go with the rest)
console.log player and you will see your Sprite being populated with the 4 different images but in the browser you will not swap between them yet when moving in different directions
You will apply the different directions to when the appropriate input is pressed
For w(up) key condition, set player's image property to player's sprites up property
Once you can see that the w key is correctly animating your sprite, set the player's image property to the other directions in the other inputs
\*\*Battle tiles and activation next
For the dark green grass areas, we want them to be our battle zones
In your map editor, create a new layer called battle zones and place red blocks in the dark green patches in that layer
Then, with them visible, export them as json, extract the array from battle zones, and place it in a new js file called battleZones with the variable battleZones, and assign the extracted array to it
In your html file, source your battleZones js above your collisions js
console log battleZones in your main js file and check that your battleZones data is present
The battle zones is set up similar to your collisionsMap, so copy and paste the for loop for collisionsMap but edit all collisionsMap to battleZonesMap, and collisions array to battleZones array in the slice method
console log battleZonesMap and if you did it correctly, the sub-arrays shown in your battleZonesMap array should be layed out similar to your collisionsMap
Rename your variable in battleZones js to battleZonesData(because we want to use that variable to create an array for battleZones to push in battle tiles)
Now, create a battleZones variable above image variable, assign an empty array to it, and below it, duplicate the forEach method you did for collisionsMap
Instead of collisionsMap for the second set, change it to battleZonesMap
For the push method, push into the empty battleZones array instead of boundaries
console log battleZones to see that a bunch of Boundary classes are added to the array
In animate, just like your boundaries, you want to use a forEach method on battleZones and for each battleZone, call draw on it
In your fillStyle in Boundary, increase your rgba opacity so that the red blocks are visible and you should see your battle zones drawn but it will not move in sync with the background
So, place battleZones array into movables and spread it just like you did for boundaries
For collision, your battle zones will work the similarly like your boundaries, just that it wouldn't stop them from moving through it
As such, the collision detection code can be used for battle zones too
Copy the collision detection code for w input, and paste the second set below it
Instead of boundaries, you will use battleZones, and change boundary variable to battleZone
Since you are not restricting movement, you do not need to include position of rectangle2 and you could just replace the whole object with battleZone which you defined
You do not want to stop player from moving in battleZones so remove the code for moving set to false inside it
Keep the break statement and console log a message when colliding with battleZones
Now, when you move through battleZones with w input, you should see the message
However, since we are detecting collision for all directional inputs and there are no additional calculations involved, it would be better to set a condition for whenever a directional key is pressed, then run the collision code to check if you are inside a battleZone, instead of placing the code inside each input
As such, above inputs section, add a battleZones collision check and set a condition to check if w or a or s or d is pressed, then run the modified collision code for battleZones
If you did it correctly, the collision message will be logged out in the battleZone regardless of direction
Currently, the moment the rectangular area of the player and the battleZone touch, the message is logged
However, we want the player to be inside the battleZones before battle is triggered
As such, we will want to add a code that detects that the player rectangle is more or less 50% inside the battleZone, then trigger the battle
To add in that condition, in battleZones collision detection, after rectangularCollision condition, add an AND operator and check if overlappingArea(variable not yet created) is greater than player width multiplied by height divided by 2(division by 2 is to reduce the area needed for the condition to occur since player dimensions is much larger than the overlapping area)
Now we want to create overlappingArea variable and in it, calculate the area of the intersecting rectangle between player and battleZone
We want to find the min of the right edge between the two intersecting rectangles at x position minus the max of the left edge at x position -> This will result in the finding the width of the intersecting rectangle
Then, we will need to find the height which means we want to multiply the above with the min of the bottom edge minus the max of the top edge of the rectangles -> multiplying with this result(height of the intersecting rectangle) will give you the intersecting(overlapping) area
Wrap the calculation for width and height separately with parenthesis so their calculations are done first before multiplying
In the condition for rectangularCollision AND overlappingArea, add an AND operator after overlappingArea condition and check for Math.random of less than 0.01
This will mean battleZone collision message will occur less than 1% of the time, simulating a random battle occurance rate
Now, instead of a collision message whenever it occurs, we will want that message to stop the player from moving and activate an animation that flashes the screen to black
\*\*Change battleZones collision check to Activate a battle to be more descriptive
In Activate a battle section, after the condition is ran, set battle's inititated(not yet made) property to true
Before the battle activation condition is ran, set a condition where if battle's iniatiated is true, return it immediately thereby preventing the code after it from running
We will need a battle object variable and within it an initiated property
As such, outside animate, create battle object and set the initiated property inside to false
In inputs section, move moving set to true and player's moving set to false before the return statement on battle.initiated to stop player from moving once battle.initiated turns true
To do this we can either do it within the canvas(not covered), or create divs with css properties
Create a parent div and wrap it around the canvas
Create a child div inside the parent div and before the canvas
Inside the child div you want a style it with background color of black, position of absolute -> the absolute position unlocks the top right bottom left properties to determine at which pixel you want the div to cover(which is 0 in this case which will make the div start at the edges of each side)
The parent div has a default position of block so it will take up the full width of the browser
To fit the width of the parent div to canvas, you will need to change its display to inline-block
Set the parent's div position to relative and this will fit the child div to its parent div(change color to see the fit if your background and child div color is the same)
Set opacity of child div to 0 once child div fits
We want to prevent the div from obstructing us in not being able to click the canvas, so set pointer-events in style to none
We will now import an animation library that uses javascript for this scene transition and for the sprites for the battle later
Import gsap cdn version 3.9.1(for this project) as a script in html
In your main js file, console log gsap to see its properties in your console(and to check if you imported it correctly)
To use gsap, you will need an id for the div you want to animate(the child div)
Give it an id and in your main js file, use call to on gsap with, first property being the given id, and the second property being an object with a property of opacity set to 1
If done correctly, your div should fade from 0 opacity to 1
Add another property inside it called repeat and set it to 3
This will repeat the opacity from 0 to 1 repeatedly up to 3 times but the animation does not look good since it is just looping 0 to 1 opacity back to back
Add another property called yoyo and set it to true
This will make the animation go to 0 to 1 to 0 to 1 three times, making the animation look smoother
Remember, this is a 'flashing' effect when a battle occurs, so you want it to be what you intended, a 'flash', so add another property called duration and set it to 0.4, simulating that flashing effect
With the animation editted to how you would like it, move the gsap.to code in battle activation section after you set battle's iniatiated property to true
When battle occurs in your battleZones, this flashing effect should take place
Notice that the flashing effect ends on your map which is not what you want because you want it to be black and you swap to a new battle screen
To end on opacity set to 1, add another property called onComplete function, and inside it use gsap.to with the first argument being the same id, and a second argument, an object with opacity set to 1, and the same duration as the original gsap.to
Now, when battle occurs, your div should flash and end at black(or whatever your background color for your child div is)
requestAnimationFrame on window will keep calling animate when the latter is passed in continuosly
Store window.requestAnimationFrame(animate) in a variable called animationId
console log animationId and you should see the animation frames constantly increasing till the end of time
When battle activation occurs, we want to stop this animation and transition to another scene with a different requestAnimationFrame
To do this we will want a deactivate animation loop section and a activate new animation loop section to keep track of which animation is occuring
To deactivate animation loop, you will call cancelAnimationFrame on window with animationId argument
If you place that section after gsap.to is ran, it will continue to run and not deactivate because it cancelled it too late as gsap.to is already running
Place the deactivation section right before battle's iniatiated property turn true(acceptable because the only moving sprite here is the player)
Right before your return statement for battle.initiated, console log animationId to check if the animation frames stop when battle occurs(if it stops it works)
The activate new animation loop section will be placed after gsap.to has ran and inside it you will call a custom method called animateBattle(not yet made)
After the animate call, you will now have a custom animateBattle method with requestAnimationFrame call on window(the code placements are getting messy, place this above your event listeners for lastKey), and console log an animating battle message inside
Once the overlappingDiv flashes, you should see animation frame stop from animate, and animating battle message in animateBattle start running continually, representing the transition from map to battle(comment/remove the console log for animationId if it lags you)
Bring battleBackground.png into the project folder
Create variable battleBackgroundImage and assign a new instance of Image to it and link it
With battleBackgroundImage linked, create a variable battleBackground and assign a new instance of Sprite with the required references(with references wrapped in an object, you can choose references the variable needs and not everything inside the object, in this case just position and image)
Set xy position to 0, and image to battleBackgroundImage
In animateBattle, call draw on battleBackground
Now, when a battle occurs, you should see the battleBackground image, but it will fade to black as dictated by gsap.to
To fix it, you will need to go back to your onComplete gsap.to and add another onComplete method with the animateBattle call
After the above, use another gsap.to with the same arguments but set opacity back to 0 to reveal the battleground image(remember the first argument of gsap.to requires the id(#) symbol to be written to link the id to html)
You should see the flash with the map, and the transition to the battleground image
We will now start editting our battleground with the necessary elements
Currently, we will need to reveal our battleground via activation from battle, which will be tedious everytime the browser refreshes
To reveal only the battleground, comment out animate call for now, and call animateBattle at the end of animateBattle method so battleground will always be drawn on the browser
We will now add battle sprites in the battleground
Move the emby and draggle sprites to our project folder
Then, create draggleImage and set a new instance of Image to it and link it
After that, create new instance of Sprite for draggle with position and image references
draggle will be the opponent so xy position will be 800,100(already calculated by author)
Set image to draggleImage and call draw on draggle in animateBattle
The full spritesheet will be drawn on your div
Similar to your player sprite sheet, you will use the frames reference here and set max property of frames to 4
Notice that draggle is not animating and if you look at the draw method in Sprite where animation occurs, we added a condition where if moving is false, we return it immediately, stopping the animation
The above was used to prevent player from animation when standing still but we need the subsequent code to run for draggle for it to animate
For the moving variable, you can change/refactor it to animate for more appropriate term(this might confuse you with the animate method but hey)
Instead of setting animate to false in Sprite, convert it to a class property and reference it in the constructor and set it to false
We will need to refactor some code in the player variable
Change all player.moving to player.animate
With animate property referenced in Sprite, you can use the reference in draggle and set it to true inside it
Now, draggle should be animated
Your draggle animation seems to be fast and to slow it down, currently, you will need to change a hardcoded value of the value after the modulus operator to a higher value, which will also affect your player sprite animation, which is not ideal
We will need to change that value to a variable that could be set specific to each sprite
Change the hardcoded value after the modulus operator to a new property called hold(not yet made) in frames
In frames reference, add a second property called hold and set it to 10
In player variable, you will need to add the hold property and set it to 10(adding a second property in frames changes it to a new object so if you do not reference hold in player you are technically referencing a completely different object)
In draggle, set hold to 30
As such, you can now change animation speed for each sprite via the hold property
You can swap between map and battleground by calling animate and commenting animateBattle and vice versa
Test the player and draggle animation speed out and see if they are correct
Once the above is correct, bring emby to the js file just like you did for draggle, with the appropriate position xy changes(280,325 -> calculated by author)
Once done, you should see emby animated on the player side of the battleground
We will now add an attack bar interface in html which will span across the width of the canvas right below our emby sprite in the battleground
In html, add a div element below our canvas but inside the parent div, style it with background color of white, width, and height of 200px each
Add position of absolute inside the new div and set bottom to 0 so the new attack bar div will stick to the bottom of the parent div
To span it across the width of the parent div, you will use the left and right properties of absolute and set them to 0
Delete your width so it is not hardcoded anymore and your div should span across the parent div now
Adjust the height so it does not cover your emby sprite
Add a border to differentiate the attack bar interface with the battleground background
Just like a pokemon game, in the attack bar interface, you will split it into attacks/skills player can employ on the left side and the right side, displaying the attack/skill type(left side being larger than the right, around 70:30 ratio)
Inside the attack bar div, add two divs
In the first div(left), add 3-4 buttons named attack1 to whatever
For the second div(right), add h1 element with Attack Type text placeholder
Add a display property of flex to the parent div of the two divs above
In css file or your body tag, set h1 element margin to 0
In your first div(left), style it with a width of 66.66%(author's or just 70%)
For your second div(right), style it with the remaining
Add display of flex to the second div(right), unlocking align-items property and set it to center, and justify-content, set it to center as well
For the first div(left), set display to grid
This unlocks grid properties, now use grid-template-columns and set it to a repeat over 2 columns and 1 fraction(fr) each
To remove the border of your attacks(not sure this is needed), set border to none for buttons
Add a button hover effect and set cursor to pointer
Import a google font style for some text customisation(place it above your css file if you are using it so your custom css file can have access to the fonts)
Set the whole document to that font
Set button and h1 element to 16px
With the attack bar interface done(sort of), we will now deal with the health bar interface
They will be located on the left of draggle and right of emby
In the parent div with the canvas tag, add a div element above the canvas tag which will represent the top left bar for draggle
Set it to black, with a 250px and 100px for width and height respectively, and a position of absolute to fit into the parent div which has a position of relative
You want to move the div to the left of draggle, so set top and left to 50px
Set a solid border for the div
Add a h1 tag inside the div and write Draggle
Remove the height property to have the div fit to the height of the text instead
If you set the font size of the previous h1 tag in html, you would need to set the font size for this h1 tag as well
Add padding of 12px to the div of draggle
Inside the draggle div and after the h1 tag, add another div which will have a default position of block, and thus it automatically takes up 100% width of the parent div which is ideal for health bar representation
Height is not determined so you can set 5px on it and give it a background color
Set a margin so Draggle text and the health bar is spaced better
This first health bar you created is when the pokemon is when it is healthy(so it should be green in this case)
Create a second div below the first health bar div and this div will represent health loss
Wrap both health bar divs with a parent div and set its position to relative
Set the green(or which ever color represents healthy) bar to position of absolute
Remove the margin property so absolute position works properly
Set top, left and right of the absolute health bar to 0 so it overlays on top of the health loss bar
Change width of absolute health bar to lower than 100% to see the 'health loss effect'
Now create an Emby div box and health bar similar to draggle
For Emby, left position should be changed to right of 50px so it's spaced the same as draggle text and bar
We will now modify our placeholder attacks(attack1, attack2 etc), starting with attack1 into tackle
In html, change attack1 to Tackle text
After call of animateBattle, select all buttons and bring them into the main js file(i call it allBtns)
For all these buttons, use a forEach method on it, and for each button,console log button for now
In console, you should see the buttons listed out
In place of the console log, add a click event listener for button instead, and console log button after
When the above is done, clicking the buttons should show on console and clicking anywhere else should not show anything
With the click event working, we can now replace the console log with an attack method for emby
Call attack(not yet made) for emby, and pass an attackMove object in it with name, damage, and type properties to it
Name will be Tackle, 10 damage, and type of Normal
After the attackMove object, add a recipient property to attack and set it to draggle
In Sprite, add an custom attack method, and pass in attackMove and recipient
So when casting tackle, we want the sprite to move from left to right, simulating a 'tackle' attack
In the attack method you just created, add a gsap.to method, pass in position property in Sprite for first argument, and for the second argument, pass in an object x and set it to x position x minus 20
Now, when you click Tackle button, you should see your emby sprite move 20px to the left
To animate using gsap in succession which includes previous gsap animations, you will need to use the in-built timeline method
Create timeline variable and set it to timeline call on gsap
Now, replace gsap of your minus 20px x animation with timeline variable
Call to on the previous to method, and set x to x position plus 40 this time
The first to call will pull x by 20px to the left while the second to call will start at the shifted position and pull x by 40px to the right in sequence
We know we want to return back to the original position
So add another to method and set x position back by 20px to the original position
We have gotten the movement down, but we want emby to 'launch' itself forward at a faster speed to really simulate that 'tackle' effect
We can do this by going to the code where we shift emby right, and add a duration property to it, setting it to a lower value than default(0.5 is default), so emby shifts right at a faster pace
Once you are happy with how tackle feels, we want to create an animation for draggle to simulate as if draggle is being 'hit' by the tackle during the time when emby shifts to the right
Add an onComplete method after duration, and call to on gsap, passing in position of recipient reference as first argument, and for the second, add an object with x property, and set it to the x position of recipient plus 10, which would shift draggle by 10px to the right when emby shifts right
To simulate the effect of draggle being 'hit', we want to create a wobble effect, and we can do this by setting yoyo property to true, and a repeat property of let's say, 5
You should see the left right wobble effect, albeit abit too slow
To increase the pace, set duration to less than default
During the wobble animation, draggle should also be 'flashing', going in and out of opacity 1 to 0 and back to 1 rapidly, to showcase it's being 'hit'
To do this we will need a second gsap.to inside the onComplete method because the first one was editted to use timeline where animations inside happen in succession, but the opacity 'flashing' is not going to need it and it happens simultaneously alongside the animations
We do not yet have an opacity property so add that in the Sprite class and set it to 1
We will need a save and restore method on context inside Sprite draw, between the drawImage method, because opacity is a global canvas property and will affect everything in the canvas, and we want to limit opacity to inside the drawImage method
Between the save and restore methods, call globalAlpha on context and set it to opacity property
Now, tweaking opacity values in Sprite property should affect only the backgrounds and sprites
Inside the previous second gsap.to mentioned, recipient will be the first argument, and second argument being an object with opacity property set to 0 for testing
Test tackle again, and draggle should wobble and fade to nothing because opacity is 0
We will make use of yoyo and repeat properties again to simulate a flashing effect, setting duration to less than default(author uses the same duration as emby shifting right)
With the animations done to your satisfaction, we want draggle's health bar to decrease when tackled
In html, give the div with the green health bar of draggle an id of enemyHealthBar
For the gsap.to method in the onComplete method in attack method, put a comment above for when draggle gets hit to define what the code does
Inside that section, add another gsap.to before the previous one, link the id you just created(you'll need the id symbol) and for the object, set width property to 50% for testing
The above works if you see the green health bar reducing by 50%
Now, we want tackle to be associated to the attack method properties you created previously for emby(name, damage, type) when emby tackles
So instead of 50%, set width to the damage property of attackMove plus a percentage(because we want a percent not an actual value of 10)
Clicking tackle now will reduce draggle's hp to 10% which is what the property is but not what we want
What we want to do is give draggle hp of let's say a 100 and subtract it by 10 so it gives a proper value
In Sprite, add a property of health and set it to 100(\*\*in a real game you will set this to a class property probably, and set it to a specific value for whatever enemy)
Now, you can subtract the health property of Sprite by the attack damage
Your onComplete method will not be able to reference the health property the current method can only reference within the scope of onComplete
As such, you will need to change onComplete method to an arrow function to unbind it and thus be able to reference outside of itself
Now, tackle should take off 10% of draggle's hp instead of reducing its health bar to 10%
With the above working, we want the player(emby) to get tackled now
Change call of attack on emby to draggle instead, and the recipient to emby
The movement is wrong because we have hardcoded values in the attack method and they apply specifically for emby on the player's side
Inside attack method, crate movementDistance variable and set it to 20
Set a condition if isEnemy(not yet made) property is true, movementDistance will be set instead to negative 20
Inside the to call on timeline, set the hardcoded values to identical values using movementDistance variable(movementDistance for the left shift, and movementDistance x2 for the right shift)
In Sprite, reference isEnemy in the constructor and set it to false, and convert it to a class property
In draggle variable, add the isEnemy property and set it to true
If the above works, draggle and emby should be tackling and wobble correctly respectively
The hp bar for draggle reduces for draggle when it tackles because we have not set up the logic for emby yet
Inside the attack method, create healthBar variable and set it to the id of enemyHealthBar
After it, set a condition if isEnemy is true, set healthBar variable to id of playerHealthBar(not yet made)
In html, add id of playerHealthBar to emby's green health bar
Instead of reference id of enemyHealthBar in gsap.to, reference healthBar variable
Add and set isEnemy to false in emby variable
Now when pressing tackle, emby's hp to reduce instead
Now switch draggle.attack back to emby and recipient back to draggle in allBtns forEach method
Now, instead of subtracting 10 hp from 100 only 1 time everytime tackle button is clicked(because health is not set to a new value when tackle is clicked)
To fix this, inside the attack method, set health to health minus attackMove.damage so when gsap.to is called each time the health value is updated
Remove attackMove.damage in the width's calculation
Now, everytime you press tackle, the previous health is updated and subtracted properly
With tackle done, change attack2 in html to Fireball
Notice that pressing Tackle or Fireball will result in a tackle either way
For the attack property in emby, we do not want to directly reference the attack object but rather have a separate js file to store all our skills/attacks and we can reference from that file instead
Create a new js file called attacks.js and move all the data js files such as collisions and battleZones js into a new folder called data inside the project folder to separate them from the image files
Inside attacks.js, create an attacks object and move the the properties of tackle into the attacks object and wrap the properties into a Tackle object
Now create a Fireball object with its name, damage of 25, and type of fire
In html, import attacks.js before classes so the latter can make use of the js file
Reference e in the event listener's callback, console log e.currentTarget.innerHTML and console log attacks right after, commenting the emby.attack till recipient out
Clicking tackle or fireball will reference the attacks object, listing the whole object in the console
Now, instead of just attacks, add bracket notation to it and move e.currentTarget.innerHTML from the previous console log into it, removing the previous log as well
Now, selecting Tackle or Fireball will reference the object directly from attacks
Once the console log above shows the correct data for each button, move the console logged text into a variable named selectedAttack, and remove the console log
Uncomment attackMove till recipient, and instead of the tackle object with its properties inside attackMove property, replace it with selectedAttack variable you just created
Clicking tackle will work correctly, but clickling fireball will show the tackle animation(because we have not made a fireball one yet), albeit it will show the correct damage number(25) which it correctly references from the Fireball object
Inside the attack method, add a switch statement, reference attackMove.name, and for case "Tackle", we want to invoke the code involving Tackle(which is the whole section from timeline till the end), so move that code inside this case and add a break statement at the end
With the switch statement in place, clicking Fireball will not show Tackle anymore while clicking Tackle should still show tackle animation
Now, we will create case "Fireball" inside the switch statement
We will need to get the fireball image file into the main js file
Now for case "Fireball", create a new instance of Sprite named fireball, passing in position object with x at x position and y at y position
Bring the fireballImage into case "Fireball"(so it only happens when Fireball case occurs), and link it from GameAssets
Add the image property in fireball and reference fireballImage
To render the fireballImage out, we will need to draw it in animateBattle, and then reference it in the attack method
Right before animateBattle, create renderedSprites and assign an empty array to it
Inside animateBattle, use forEach method on renderedSprites and for each sprite, call draw on it
Inside the click event listener, in attack property of emby, add renderedSprites inside the object
Back to attack method, reference renderedSprites, and in case "Fireball", after the creation of fireball, use push method on renderedSprites, passing in the new instance of fireball Sprite
Clicking fireball button now should show the full fireball spritesheet on the canvas
With the above working, we can add frames property when creating the new Sprite of fireball, and set max to 4(since fireball has 4 sprites)
For hold property we used for draggle animation(lower value means faster animation and vice versa), the value will be set to 10
Unlike the custom made animation of tackle, since we are using sprite images here just like when player is moving on the map, we will need to reference animate property inside fireball, and set it to true
Now, you should see fireball image animation at emby's position
To animate the fireball moving from emby's position to draggle, we will use gsap.to after the push method on renderedSprites
Inside gsap.to, reference fireball's postion, and for the second argument(destination), add an object with x position of recipient as x, y position of recipient as y
The above should move the fireball animation from emby to draggle
You want to remove the fireball animation after it reaches draggle, so create an onComplete arrow function method, and use pop on renderedSprites array inside it
In the section Draggle takes damage(changed to Recipient takes tackle damage for tackle and takes fireball damage for fireball), we want that code logic for when the fireball hits draggle as well, so copy and paste that code inside the onComplete method in fireball
We will need the healthBar id and its condition accessible by all attacks inside the attack method, so move that two lines of code into the global scope inside attack method
Now, clicking fireball should spawn fireball animation from emby position to draggle position, and when fireball reaches draggle, the 'damage taken' animation should be shown
Notice that the healthBar for draggle does not move when fireball hits
This is because the health variable is exclusive to Tackle, and cannot be found in the fireball case
As such, just do the same thing with healthBar, and move it to the global scope within attack method
Now, fireball should subtract 25 from draggle's hp bar
The fireball position is currently spawned from the top left most of emby's sprite(which is the 0,0 position of any image)
Instead of calling draw on draggle and emby, we can now place them inside renderedSprites array, and the forEach method of renderedSprites which calls draw on each sprite will draw out draggle and emby
To spawn fireball in front of emby, we will replace the push fireball method on renderedSprites to a splice method
In the renderedSprites array, we want fireball to be in between draggle and emby, thus we will splice at index 1(which is between 0 and 2), taking out 0 array items, and placing fireball Sprite in
Doing so will spawn the fireball in front of emby but the pop method you did will pop emby(because array is [draggle, fireball, emby]), instead of the fireball image at the end
So, replace the pop with splice method and splice at index 1, and take out 1 array item, which will remove the fireball array item
With the above working correctly, we will now tweak the fireball to 'shoot' correctly in the correct direction
We will need a helper property called rotation, reference it and set it to 0, and convert it to a class property in Sprite
We will now use emby to test out rotation in canvas(because fireball is not generated on canvas until fireball is clicked so it will be difficult to visually see how rotation works)
In Sprite draw, use translate method on context(between save and restore), which has a default of 0,0 starting at the top left corner of canvas
To move this point to the top left corner of emby, pass in its xy position
To move this point to the center, you will need to add width divided by 2 for x, and add height divided by 2 for y
With the point in place, you can call rotate on context, with the first argument being radian(Math.PI multiply by 2 is a full circle for reference)
For now, rotate by 1 radian(around 45 degrees)
And, we will need to translate context back to its original position(0,0) on canvas or the rotation will not work
After calling rotate, call translate again and change the positions, width and height to negative values to reinstate them back to position 0,0
Your whole background along with the sprites will be rotated now
Inside the call of rotate on context, change 1 to rotate property(which has a default of 0), which will revert background back to its original position
With rotation visualised, we can now use the method on the fireball image
Inside fireball, add a rotation property and set it to 1
Your fireball should look like it rotated(kinda)
We will now test it for draggle, so in the event listener, change emby.attack to draggle.attack, and the recipient to emby
Clicking fireball will spawn it from draggle now but the fireball will shoot in the opposite direction
Instead of using a hardcoded value of 1 for rotation property, in attack method, create rotation variable in the global scope within attack method and set it to 1
For the rotation property in fireball, set it to itself(you can write rotation instead of rotation: rotation because they are the same)
Below rotation variable, set a condition if isEnemy is true, set rotation to a negative value and tweak it till it looks to your liking(you can tweak the rotation for emby's fireball as well)
We will now create a dialogue box overlayed on top of our attack bar interface when any attack is clicked
In html, find the div that represents your attack bar interface and create another div inside with some dummy text, and it should show up alongside your attacks
Currently, it's pushing your attack buttons away to fit itself in the div
Add a position of absolute to it so it does not interact with the space of your buttons
Set top, right, bottom, and left to 0, and give it a background color so you can see the space it is occupying(which should be the whole attack interface)
This div you just created should only appear when you click an attack, so set a display of none for now
Give the div an id of dialogueBox because we want to unhide it whenever an attack is used
In attack method, link the dialogueBox id(to a variable if you want)
Use style.display on it and set it to block
In your game, click an attack and you should see the dialogueBox overlayed on your attack interface
In your Sprite class, reference name and convert it to a class property
Back in your js file, set dialogueBox.innerHTML to name property + " used " + attackMove.name(Or use template literals)
Now, when using an attack, you should get undefined used that attackMove
Go to your main js and find draggle and emby
You'll need to add the name properties of draggle and emby and set them to their respective names so your attack method can reference their individual names instead of undefined
Undefined should be Emby now
We should refactor now and move code involving battles to a different js file
Move everything from battlegroundImage to your selectors for buttons out to the new js file and name it battleScene
You will need to import battleScene.js into your html(old school way), and place it last because it requires data from classes and your main js file
Your game should still work the same after the above
In your battleScene js file, add a click event listener for dialogueBox and console log clicked text for now(\*\*I used id directly because the id is immediately created in the DOM once the id is set in html)
Change cursor to pointer for dialogueBox so user knows it is clickable
Clicking the dialogueBox will only log out the clicked message for now
Add the event object inside the callback function of the event listener(or e)
Call currentTarget for e and call it's style.display to none
This will hide the dialogueBox whenever it is clicked now
\*\*New javascript term(for me): Queue
A queue in js is an array with functions/methods in it and once the function/method is triggered, it is removed from the array
In battleScene js, create queue after animateBattle call and assign empty array to it
In the buttons event listener, after emby attacks, you want to use push on queue, passing in an arrow function with draggle.attack(and change recipient to the opposite)
The attack should also not be our selectedAttack(because it's the enemy AI and should be random)
So, instead of selectedAttack for draggle, set attack to attacks.Tackle for now
Now, we will need to call queue inside your event listener for dialogueBox to trigger the draggle.attack in queue array
In dialogueBox event listener, set a condition where if queue's length is more than 0, call 0 index of queue(\*\*written as queue[0]() for arrow function calls), and shift the queue array immediately after(demonstration of what queue in javascript is)
Else e.currentTarget.style.display set to none(move this to the else condition)
Now, when you click an attack and click on the dialogueBox, you should see that draggle use Tackle(since you selected Tackle for draggle)
To summarise what just happened, player selects attack, clicks on dialogueBox trigger the condition in the event listener where queue's length is more than 0, calling 0 index of queue, queue array shift() happens after, queue array is empty, clicking dialogueBox again goes through the condition again, queue array is empty so go to else condition, dialogueBox display becomes none
Currently, attacks such as Tackle and Fireball in the html are placed in a static manner, while we want them to be dynamically(using javascript)
In the div encasing your html buttons, add an id called attacksBox, and remove the button tags
Now in battleScene.js, create a button element before animateBattle, with variable called button
Set the button's innerHTML to Fireball
Bring the attacksBox div into this js file, and append the button to it
You should see Fireball button being shown in the browser in your attack interface and it should work when you click it
Just like your attacks.js, we want to create a separate file for our monsters(currently emby and draggle)
Create monsters.js file and inside it create a monsters object with an Emby object
In your battleScenes file, find emby variable and extract all properties inside the new instance of Sprite and place it inside the Emby object you just made in monsters.js
You will need the image link for emby so move embyImage and the src to monsters.js as well
Import monsters.js to your html right after attacks.js
Now, since you move emby properties to a new file, when creating a new instance of emby Sprite, you will need to properly reference it from said new file
Reference monsters.Emby object in your emby Sprite and the code should work as before
Now do the same for draggle
With emby and draggle refactored into a new file, we can now add a new property called attack and set it to an empty array
This empty array will be populated by attacks, and later randomised for the enemy
Right now, we have two attacks, Tackle and Fireball
For now, let's populate the array with both Tackle and Fireball from your attacks.js for both Emby and Draggle
In your Sprite class, we do not have a reference for attacks but extending the constructor references further seems to convoluted(also your Sprite class should not have a default attack property anyway since it applies individually for each unique monster)
As such, we will need a child class for Sprite and refactor certain properties in Sprite to Monster because we want Sprite to only handle Sprite drawing and all else should be separated(\*\*Single responsibility principle)
We will create a child class for Sprite called Monster using the extends keyword
Now, move the entire attack custom method into Monster child class
Create a constructor and move isEnemy and name property from Sprite into Monster
All conversions related to the above from reference to class property should also be moved alongside the references(Move health property to Monster --> This has no reference just a hardcoded 100)
Once the properties you think are unique to the Monsters child class are refactored/moved, you will need to copy the rest of Sprite's constructor into Monsters constructor
Now, call super for the properties in Monster with an object notation(because we wrap the references in as an object in the constructor) and copy position till rotation inside this the object, removing the assignments because the super call is calling the properties that has these assignments from the parent class
Back in battleScene, we will not be creating new instances of Sprite for emby and draggle but Monster instead
\*\*This is a huge refactor so test it out in your browser and make sure that your code is working
The purpose of the refactor for Monster is to be able to add new properties and not affect the default Sprite class
Now, add attacks as reference to Monster and convert it to a class property
Back to monsters.js, the Tackle and Fireball objects you created in attacks.js will now be accessible via the Monster class and you can check this by console logging emby or draggle after the new instances of Monster
You should be able to see a Monster object and a list of objects, one called attacks that is populated with the Tackle and Fireball objects with their properties
Right above animateBattle, you want to use the forEach method on emby.attacks and for each attack, move the button element you created up to the code in which you appended the button into the arrow function
Instead of just "Fireball", you want its attack.name
\*\*To add or edit an attack, you will do it in attacks.js. Followed by going to attack method in classes.js and adding a switch case with how you want the animation logic to be. Lastly, you will need to populate it in the attacks array in monsters.js
Add the remaining attack in your queue using push in your event listener
To randomise the attacks being employed by the opponent(draggle), inside the click event listener for your buttons, above the push methods on queue, call attacks on draggle, with a randomised number between 0 and length of draggle's attacks(you will need to wrap Math.floor on your randomised number to get a whole number for your indexes)
You can assign the above to a variable called randomAttack
Now, instead of referencing the attacks object directly in the attackMove property in your push method, you can reference randomAttack which will get a random attack from the attacks object
Since it's a random attack, you can now remove the second push method on queue
Test the battle out in your game to make sure the attacks are randomised for draggle
Back to your event listener for your buttons, add another button event listener for mouseenter below it
Console log a random message in your new event listener and you should see each time you click on your attack buttons, it should log out the message
We will now copy the selectedAttack and its assignment you did for your previous button event listener and paste it in your new event listener
Pass in the event object(e) on your callback function
In your html for your h1 tag for Attack Type text, add an id called attackType
Back to your event listener, bring the attackType div into your event listener and set its innerHTML to selectedAttack's type property
Now, hovering over Tackle or Fireball should show your attack's type
You can change the color of your attack type text by adding a property in your attacks called color and setting them to the color you want for each attack type
Back to your event listener again, just like how you reference for type, you can call style's color on your querySelector(or the variable you assign it to), and reference the color property on selectedAttack
Add a section called draggle or enemy attacks for your randomAttack, and push method on queue
Above that section, set a condition when draggle's health is less than or equal to 0, call push on queue, passing in an arrow function of faint method(not yet made) on draggle
After the condition, call return statement to immediately end after the condition is met as we do not want draggle to attack after it has fainted
Inside your Monster class, we will add the faint method
Below the constructor, add faint custom method and console log a message in it
The idea is that when draggle's hp goes to 0 or below, the message should be logged out which is not the case
In your attack method, notice that we are decrementing health by damage numbers, but health in this case only affects the player(emby) and not the opponent(recipient)
As such, we will need to go to codes that reference this.health to be swapped to recipient.health because that's when the faint condition will occur(for now)
After refactoring the above, when draggle's health goes to 0, the message should log out
Now, replace that console log with the dialogueBox div and set its innerHTML to this.name has fainted
Inside faint method, you would also want the monster fainting to have a faint animation
USe gsap.to with what you want to animate as first argument(this.position) and at the current position, wrap second argument in an object and set y to the current y's position plus 20(down)
Call a second gsap.to and call this keyword on first argument, and set opacity to 0 on the second argument
Now, when draggle faints, it should play the gsap animation you just wrote inside faint method
Once the condition for draggle fainting is done, we want to do it for the player(emby) as well
Emby fainting should only occur after draggle attacks so the condition for emby.health going below 0 should be placed below the draggle attacks section
Test it out and emby should faint when draggle bring its health to 0
Now, we want to transition back to the map after the battle has ended
We can do this after the condition when draggle's health goes to 0(or emby but we testing it out on draggle first)
Remove the return statement
Add another push method on queue, and inside the arrow function, add a section that says fade back to black
Inside the section, use gsap.to on overlappingDiv id and set opacity to 1
Now, when draggle's hp goes to 0, the battle screen should turn black but the divs for health and attack are still visible
To place the overlappingDiv over them, go to html(or css if you use that), and in style, set z-index to more than 1(default is 1)
We want to transition back to the map after the fade so add an OnComplete property in the gsap.to method, assign it an arrow function, and call cancelAnimationFrame, passing in battleAnimationId(not yet assigned)
For your requestAnimationFrame for animateBattle, assign it to a variable called battleAnimationId, and create that variable outside
Console log battleAnimationId after calling draw on background in animateBattle to check if animateBattle is cancelled after fading to black(frames should keep increasing in console, and when it fades to black, frames should stop running)
Once the above works, call animate after cancelling animation for animateBattle in the onComplete property
The fade to black does not immediately transition back to map because opacity is still at 1
You will need to call gsap.to after animate call on the overlappingDiv and set opacity back to 0 so the map shows
The map will show once the above is implemented but the health bars and attack interface remain
In your html you want to separate your user interface divs and your overlappingDiv, using the canvas as the middleman(overlappingDiv, canvas, user interface)
Move your health bars to below canvas together with your attack and dialogueBox interfaces
Now, wrap the health bar up till your attackType div in a parent div with an id of userInterface
With the above done, you can now bring in the userInterface div in onComplete property after animate call
Set userInterface's style display to none
Now the transition back should be visually correct, but when you re-activate battle by going into the battle patches again, your interfaces will be missing now(along with draggle) and will need to be re-initialized
Back in battleScene.js, you will need a new custom method call initBattle, before animateBattle method
All initialization of the battle should be inside this method
For draggle and emby, you can create their variables outside not assigned to anything, and create their instances inside initBattle
Do this for renderedSprites as well
The forEach method for attacks where we create our buttons should be inside initBattle too
We would want to reset queue as well after a battle is done so move queue assignment into initBattle and the variable outside as well
The event listeners for our buttons should be place inside initBattle as well since they only occur inside a battle
dialogueBox will not be moved inside initBattle because we only want it to occur once and placing it inside initBattle will activate double clicks
Call initBattle before animateBattle so animateBattle can reference initBattle
Go back to your browser and retry the sequence --> faint, map transition, back to battle
The transition back to battle will not work as you will need to call initBattle alongside the animateBattle call when you first call it when activating a new animation loop(i lied it will still not work yet)
When you initialize battle, you will see couple things missing(sprites, and userInterface)
To reactivate userInterface, since we set display to none when transitioning from battle to map, we will need to set display to block at the start of initBattle(you will need to bring in the userInterface div inside initBattle)
Do it for dialogueBox as well and set its display to none
For Health bars(it will show draggle's hp to be 0), you will need to set health bar of enemy and player back to 100%
Replaying the transitions again your user interface appear but sprites are still missing and you have duplicates in your attack bar
To remove duplication, because your attackBox is repopulated with buttons but not removed initially, you will need to bring in your attackBox div in initBattle, and call replaceChildren on it so you have a clean slate
For the disappearing sprites, the bug is in your classes.js, in the onload function for image
Sometimes, images do not load when your onload is set after your image src
You will need to set image.src as a class property and the image property should be set to a new instance of Image directly
You create your monsters inside initBattle where you passed in monsters object
So, go to monsters.js for your monsters object, and instead of referencing the images of draggle and emby in their image properties, assign the iamge property to a source(src) object with the direct image link
Remove the code for linking images at the start of monsters.js because you are now directly linking them in your monsters object and referencing them from your Sprite class
\*\*image.src references image from constructor so you do not need an image.src inside constructor
The transition to map only happens when draggle faints, so you will need the push method on queue for emby's health to 0 condition as well(there's probably a way to merge them to one so all monsters share the same code for the transition)
You will need to set battle.initiated back to false in the onComplete properties in the fade to black sections so player can move again when user transitions back to map
\*\* There was a bug on my side where emby health goes to 0 and it did not faint, and only another attack after that made it faint. This is because i did not put the condition inside the queue method
We will now add audio to our attacks and such
Create audio.js and audio object
Import audio js to html
Bring in the audio files into a new audio folder
Inside audio object, we will not be using new Audio in-built within javascript as it not very good
We will be using howler.js library instead for sounds
Copy the script tag for howler.js (version 2.2.3 for this) in cdn and import it to your html in a script tag
Create Map property and call a new instance of Howl(with howler.js) and pass in object with src property linking your map audio file
We will need to add a html5 property assign to true inside the object as well or it will not work because we do not have a local server
We are still in our battleScene which we do not want so go to battleScene and comment out initBattle and animateBattle and uncomment/call animate
It should show your map now but with the userInterface overlayed on top
Go to your html and set its style to display of none so your map is fully visible
In your main js file, try calling play from the Map property in audio object(My audio could play but author's could not so xD)
Anyway, create a click event listener with an arrow function to call play on audio's Map property
This will trigger it multiple times whenever you click so you create a boolean effect by creating clicked variable assign to false, and inside the event listener, only play the audio if clicked is false, then set clicked to true
With the above done, trigger a battle and you will notice the audio continues to play which we do not want
We want the audio to stop playing, maybe trigger a transitional audio to battle, and stop that transitional audio, and then switch to battle audio
Go to our cancelAnimationFrame for animationId where we deactivate animation to transition to map
This is where battle triggers so call stop on the audio for Map after the above
We will call play on initBattle property(not yet made) on audio and also a battle property on audio right after
Back in audio js, create new InitBattle with new Howl passing an object with src and html5 properties similar to what you did for Map
Do the same for Battle property as well(some audio files are wav and some are mp3)
Notice that the volume is abit too loud for the transition, so we can add a volume property and set it to the appropriate value(0 is mute 1 is max volume)
We will now bring in sound effect for tackle
In your audio object, add tackleHit property and assign new Howl, passing in the same properties as before, assigning the properties the appropriate value or links
Do the same for fireball(call it fireballHit)
You will have an additional property called initFireball(to simulate the creation of the fireball) with the same properties
For tackle, we go to attack method and find the instance when our recipient gets hit
In the section Draggle takes damage(changed to Recipient takes tackle damage for tackle and fireball damage for fireball) for case Tackle which is where recipient gets hit by tackle, call play on audio's tackleHit
Comment animate in battleScene and uncomment initBattle and animateBattle to get into battles to test the sounds
You will hear map audio once clicking on tackle but we will not start with a battle by default so it is fine for now(or you can comment the audio for map out for now)
For initFireball, we go to where we create fireball which is in attack method, in the switch case for Fireball
Inside the case, add the audio for initFireball at the start
For fireballHit, find the section where recipient takes fireball damage, and call play on the appropriate audio
With the audio for the attacks working, we want to bring in audio for victory into audio.js for fainting(basically we do not have a fainting sound effect just an immediate victory sound effect after a monster faints)
In our faint method, right after everything, we will call play on victory's audio
So when battle ends, we want to play map music on transition
To do that, we go to the conditions where when draggle's or emby's health goes to 0, right at the end when initiated becomes false, we play the map audio(do it for both emby and draggle)
Uncomment animate in battleScene and comment the our calls and change opacity of Boundary to 0, and uncomment your map audio code if you commented it, and test your game out
You will hear battle music even when battle is done so we want to go the code where it dictates battle is done to stop the battle music
\*\*I tried it putting it in both when draggle or emby faints, but i guess it's better to place it in faint method after victory(faint) sound effect
\*\*I called play on map without the boolean and event listener and it works on my browser(commenting the boolean and event listener for reference), although this is on linux(ubuntu) so that might have been the difference
And done!(maybe)
