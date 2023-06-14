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
