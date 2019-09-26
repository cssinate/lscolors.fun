export let lsResults = [{
  code: 'no',
  short: 'default',
  description: 'default/base styling',
  fg: 0,
  bg: 0,
  eff: '00'
},
{
  code: 'fi',
  description: 'file',
  fg: 0,
  bg: 0,
  eff: '00'
},
{
  code: 'di',
  description: 'directory',
  fg: 34,
  bg: 0,
  eff: '01'
},
{
  code: 'ln',
  short: 'symlink',
  description: 'symbolic link',
  fg: 36,
  bg: 0,
  eff: '01'
},
{
  code: 'mh',
  description: 'multi-hardlink',
  fg: 0,
  bg: 0,
  eff: '00'
},
{
  code: 'or',
  short: 'broken symlink',
  description: 'broken symbolic link',
  fg: 31,
  bg: 40,
  eff: '01'
},
{
  code: 'pi',
  description: 'named pipe',
  fg: 33,
  bg: 40,
  eff: '00'
},
{
  code: 'do',
  description: 'door',
  fg: 35,
  bg: 0,
  eff: '01'
},
{
  code: 'bd',
  short: 'block driver',
  description: 'block device driver',
  fg: 33,
  bg: 40,
  eff: '01'
},
{
  code: 'cd',
  short: 'character driver',
  description: 'character device driver',
  fg: 33,
  bg: 40,
  eff: '01'
},
{
  code: 'so',
  description: 'socket',
  fg: 35,
  bg: 0,
  eff: '01'
},
{
  code: 'su',
  short: 'setuid file',
  description: 'setuid file (u+s)',
  fg: 37,
  bg: 41,
  eff: '00'
},
{
  code: 'sg',
  short: 'setgid file',
  description: 'setgid file (g+s)',
  fg: 30,
  bg: 43,
  eff: '00'
},
{
  code: 'ca',
  short: 'capability',
  description: 'file with capability',
  fg: 30,
  bg: 41,
  eff: '00'
},
{
  code: 'ex',
  short: 'executable',
  description: 'executable file',
  fg: 32,
  bg: 0,
  eff: '01'
},
{
  code: 'mi',
  short: 'missing file',
  description: 'non-existent file referenced by a symlink',
  fg: 0,
  bg: 0,
  eff: '00'
},
{
  code: 'ec',
  description: 'non-filename text',
  fg: 0,
  bg: 0,
  eff: '00'
},
{
  code: 'ow',
  short: 'other-writable dir',
  description: 'directory, others can write (o+w)',
  fg: 34,
  bg: 42,
  eff: '00'
},
{
  code: 'st',
  short: 'sticky dir',
  description: 'director with sticky bit (+t)',
  fg: 37,
  bg: 44,
  eff: '00'
},
{
  code: 'tw',
  short: 'sticky o-w dir',
  description: 'directory with sticky bit, others can write (+t,o+w)',
  fg: 30,
  bg: 42,
  eff: '00'
}
]
