<template>
  <pre><span class="b-prompt">you@home:~$</span> <span class="b-no">ls -1</span>
<span class="b-no">  not defined (probably unnecessary)</span>
<span class="b-fi">  file</span>
<span class="b-di">  directory</span>
<span class="b-ln">  symbolic link</span>
<span class="b-or">  broken symbolic link</span>
<span class="b-pi">  named pipe</span>
<span class="b-do">  door</span>
<span class="b-bd">  block device</span>
<span class="b-cd">  character device</span>
<span class="b-so">  socket</span>
<span class="b-su">  setuid file (u+s)</span>
<span class="b-sg">  setgit file (g+s)</span>
<span class="b-ow">  directory, not sticky, writable by others (o+w)</span>
<span class="b-st">  directory, sticky, not writable by others (+t)</span>
<span class="b-tw">  directory, sticky, writable by others (+t,o+w)</span>
<span class="b-ex">  executable file</span>
<span class="b-mi">  non-existent file pointed to by a symbolic link</span>
<span class="b-ec">  non-filename text</span></pre>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.b-prompt {
  color: red;
}

.b-no {
  color: red;
}

.b-fi {
  color: red;
}

.b-di {
  color: red;
}

.b-ln {
  color: red;
}

.b-or {
  color: red;
}

.b-pi {
  color: red;
}

.b-do {
  color: red;
}

.b-bd {
  color: red;
}

.b-cd {
  color: red;
}

.b-so {
  color: red;
}

.b-su {
  color: red;
}

.b-sg {
  color: red;
}

.b-ow {
  color: red;
}

.b-st {
  color: red;
}

.b-tw {
  color: red;
}

.b-ex {
  color: red;
}

.b-mi {
  color: red;
}

.b-ec {
  color: blue;
}
</style>
<!--
https://gist.github.com/jmoz/280005/3dca508fb193b6ae5d1f4a3f21efc7d90ecb0bde

# di=5;34;43 Setting the LS_COLORS di parameter to the above example will make directories appear in flashing blue text with an orange background
#0 =  Default Colour
#1 = Bold
#4 = Underlined
#5 = Flashing Text
#7 = Reverse Field
#31 =    Red
#32 =    Green
#33 =    Orange
#34 =    Blue
#35 =    Purple
#36 =    Cyan
#37 =    Grey
#40 =    Black Background
#41 =    Red Background
#42 =    Green Background
#43 =    Orange Background
#44 =    Blue Background
#45 =    Purple Background
#46 =    Cyan Background
#47 =    Grey Background
#90 =    Dark Grey
#91 =    Light Red
#92 =    Light Green
#93 =    Yellow
#94 =    Light Blue
#95 =    Light Purple
#96 =    Turquoise
#100 =   Dark Grey Background
#101 =   Light Red Background
#102 =   Light Green Background
#103 =   Yellow Background
#104 =   Light Blue Background
#105 =   Light Purple Background
#106 =   Turquoise Background

# http://www.bigsoft.co.uk/blog/index.php/2008/04/11/configuring-ls_colors
#no NORMAL, NORM        Global default, although everything should be something
#fi FILE                Normal file
#di DIR                 Directory
#ln SYMLINK, LINK, LNK  Symbolic link. If you set this to .target. instead of a numerical value, the color is as for the file pointed to.
#pi FIFO, PIPE          Named pipe
#do DOOR                Door
#bd BLOCK, BLK          Black device
#cd CHAR, CHR           Character device
#or ORPHAN              Symbolic link pointing to a non-existent file
#so SOCK                Socket
#su SETUID              File that is setuid (u+s)
#sg SETGID              File that is setgid (g+s)
#tw STICKY_OTHER_WRITABLE   Directory that is sticky and other-writable (+t,o+w)
#ow OTHER_WRITABLE      Directory that is other-writable (o+w) and not sticky
#st STICKY              Directory with the sticky bit set (+t) and not other-writable
#ex EXEC                Executable file (i.e. has .x. set in permissions)
#mi MISSING             Non-existent file pointed to by a symbolic link (visible when you type ls -l)
#lc LEFTCODE, LEFT      Opening terminal code
#rc RIGHTCODE, RIGHT    Closing terminal code
#ec ENDCODE, END        Non-filename text
#*.extension            Every file using this extension e.g. *.jpg

-->