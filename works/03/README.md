WORKSHOP 03 - 20/02/2019

VII. 2 different colors look alike -- subtraction of color

"To make 2 different colors look alike"

Learnings regarding previous session:
  - The color change <-> interaction mapping should be iterated upon. Currently the ways of onteraction do not help in finding insights about the question being posed. Perhap the modes of interation should be tailored to each questions characteristics. For instance, what would be a helpful tool in finding two colors that look alike? You woud want to take your composition and change only specific colors to be able to compare the changes. The two previous works both featured fixed Saturation and Lightness values, with the Hue being the only (shared!) variable. These works hardly allowed interaction to be a part of the exploration.
  - To do: find a better way to map the 0-255 range to device orientation and mouse/scrolling mechanics.
  - To do: find a way to selectively change color.
  - To do: find a way to compare color compositions.

Notes after session:
  - The hsla() CSS coloring method is something I have been using instead of the more common rgba() method. I don't know necessarily why I do this, but it does seem to help for these exercises. Keeping the saturation and lightness values the same while modulating is the Hue is something I have been doing for the past 3 exercises and is why the colors in these works seem to maintain relation their contrast to eachother. Perhaps using rgba() could lead to more explorative works?
  - HSL to me as a colourblind person feels like a more intuitive approach to describing. There's lightness which is to me the most comprehensible factor -- like an overal volume knob. Saturation which kinds of is like the 'gain', or 'strength' factor. Lastly there's this mysterious variable 'hue' -- which in my mind has the most impact of the three -- steering the color in a certain (unmeasurable) direction. Admittedly, 'hue' really is quite a hard concept for me to grasp, but HSL seem is much more predictable to me than combining gradations of Red, Green and Blue and predicting the resulting color.

IDEA FOR SESSION: RGB EXPLORATIONS -- having three columns on screen, each having a solid background color. On each of these columns the hexadecimal representation of the background color is shown. In the middle of the screen a rectangle is shown with these three colors (shades of R,G,B) are combined as one color. Mouse/Orientation events control the 'strength' of these three colors.
