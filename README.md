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
