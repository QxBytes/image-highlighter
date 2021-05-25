# Automatic Image Highlighter for Google Docs
<ul>
  <li>Works with any image (vertical images work better than horizontal ones)</li>
  <li>Works with most text (see below)</li>
  <li>Any monospaced font works, but you need to count the # of characters per line, excluding the new line</li>
  <li>Does not work with tabs, lists, bullet point lists, images, tables etc. TEXT ONLY. </li>
  <li>Does work with spaces/line breaks, however</li>
  <li>Single spaced for best results</li>
  <li>This is more of a proof of concept/for fun rather than anything practical</li>
</ul>
<h2>Steps for Preprocessing an Image (A useful tool on its own!)</h2>
<ol>
  <li>Download an image, rename it to input.png (if it is a png), and put it in the same directory as <code>color.py</code></li>
  <li>Run <code>color.py</code>, or, if you have a jpeg or want more features, run with the paramters below:
  <li>Run <code>color.py</code> with parameters <code>[TEMPLATE STRING] [FILE NAME] [CHARACTERS PER LINE]</code></li>
  <li>The following selectors are available
    <ul>
      <li><code>{a}</code> alpha value from 0-255</li>
      <li><code>{r}</code> red value from 0-255</li>
      <li><code>{g}</code> green value " "</li>
      <li><code>{b}</code> blue value " "</li>
      <li><code>{x}</code> x position of this pixel</li>
      <li><code>{y}</code> y position of this pixel</li>
      <li><code>{bw}</code> 0 if white, 255 if black</li>
      <li><code>{ha}</code> alpha hex value (e.g. FF)</li>
      <li><code>{hr}</code> red hex value</li>
      <li><code>{hg}</code> green hex value</li>
      <li><code>{hb}</code> blue hex value</li>
      <li><code>\n</code> new line</li>
    </ul>
  </li>
  <li>By default, the code will replace the selector with the actual value for EACH pixel value in the image. 
  The default template is <code>#{hr}{hg}{hb} </code>. 
  Note the space as the values are appended to <code>output.txt</code> with straight concatenation</li>
  <li>The default resize is to 70 pixels wide (preserves proportions). The default file is input.png</li>
  <li>Using defaults, your output.txt should look like <code>#ABCDEF #123456 #ABC123 #FFFFFF etc.</code></li>
</ol>
<h2>Steps for highlighting an image</h2>
<ol>
  <li>Create a new google doc, and paste the output of output.txt from before. The data may be 50+ pages. Be patient.</li>
  <li>In google docs, go to <code>Tools > Script Editor</code> and import the .gs files. Make sure <code>DocUtils.gs</code> is at the top.</li>
  <li>Save and return to the original doc. There should be a new menu item next to "Help" in the top bar</li>
  <li>Click on the option and it will prompt you. Follow the defaults or change them if you'd like</li>
  <li>When it asks for an SRC link, COPY the URL of the google doc you pasted data into earlier</li>
  <li>Wait for 30 seconds and it should highlight everything automatically</li>
</ol>
