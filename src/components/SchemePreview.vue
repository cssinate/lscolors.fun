<template>
  <pre class="terminal">
<span class="b-prompt">you@home</span><span class="t-fg">:<span class="a-bBlue">~</span>$ ls -1</span>
<div class="v-contents" v-for="(result, index) in lsResults" :key="index"><span class="lsResult" :id="`b-${result.code}`" :data-fg="result.eff != '01' ? result.fg : parseInt(result.fg.toString().replace(/^3/, '9'))" :data-bg="result.bg" :data-eff="result.eff">{{result.description}}</span>
</div></pre>
</template>

<script>
export default {
  props: ['lsResults']
}
</script>

<style lang="scss" scoped>
.b-prompt {
  color: var(--a-brightGreen);
  font-weight: bold;
}

@import '../scss/vars';
.a-bBlue {
  color: var(--a-brightBlue);
}

pre {
  font-size: 1.3em;
  padding: 1rem;
  counter-reset: lsResults;
  line-height: 1;
}

.terminal {
  color: var(--t-fg);
  background-color: var(--t-bg);
}

.t-fg {
  color: var(--t-fg);
}

.lsResult {
  display: inline-flex;
  &::before {
    counter-increment: lsResults;
    content: counter(lsResults) " -";
    display: inline-block;
    width: 4ch;
    padding-right: 1ch;
    text-align: right;
    background-color: var(--t-bg, black);
    color: var(--t-fg, white);
    font-weight: normal;
  }
}

$foregrounds: (0: $t-fg, 30: $black, 31: $red, 32: $green, 33: $yellow, 34: $blue, 35: $magenta, 36: $cyan, 37: $white, 90: $bBlack, 91: $bRed, 92: $bGreen, 93: $bYellow, 94: $bBlue, 95: $bMagenta, 96: $bCyan);
$backgrounds: (0: $t-bg, 40: $black, 41: $red, 42: $green, 43: $yellow, 44: $blue, 45: $magenta, 46: $cyan, 47: $white, 100: $bBlack, 101: $bRed, 102: $bGreen, 103: $bYellow, 104: $bBlue, 105: $bMagenta, 106: $bCyan, 107: $bWhite);

@each $key, $value in $foregrounds {
  [data-fg="#{$key}"] {
    color: $value;
  }
}

@each $key, $value in $backgrounds {
  [data-bg="#{$key}"] {
    background-color: $value;
  }
}

[data-eff="01"] {
  font-weight: bold;
}

[data-eff="04"] {
  text-decoration: underline;
}

</style>

<!--/*

NOTE: Explain why bold makes bright!

https://geoff.greer.fm/lscolors/

https://gist.github.com/jmoz/28'0005/3dca508fb193b6ae5d1f4a3f21efc7d90ecb0bd'e

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
#1'00 =   Dark Grey Backgroun'd
#1'01' =   Light Red Background
#102 =   Light Green Background
#103 =   Yellow Background
#104 =   Light Blue Background
#105 =   Light Purple Background
#106 =   Turquoise Background

# http://www.bigsoft.co.uk/blog/index.php/2'008/04/11/configuring-ls_color's
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

*/-->
