/**
UTF8(BOM)  LGPL  trydofor.com  May.2007
===========================================================
void parse(a9dom)
*/

var AreaBashParser = function()
{
    A9Dom.type.area_bash = {
        bracket_sm:     "area_bash.bracket_sm",
        bracket_md:     "area_bash.bracket_md",
        bracket_bg:     "area_bash.bracket_bg",
        type_string:    "area_bash.type_string",
        word_comment:   "area_bash.word_comment",
        word_keyword:   "area_bash.word_keyword",
        word_command:   "area_bash.word_command",        
        word_builtin:   "area_bash.word_builtin"
    };

    var __ascp__ = new AreaSyntaxCodeParser();
    {
        __ascp__.putOprchar(';');
        __ascp__.putMulQuote(A9Dom.type.area_bash.type_string,'"','"',true,'\\');
        __ascp__.putMulQuote(A9Dom.type.area_bash.type_string,"'","'",true,'\\');
        __ascp__.putOneQuote(A9Dom.type.area_bash.word_comment,'#');
        __ascp__.putPairing(A9Dom.type.area_bash.bracket_sm,'(',')');
        __ascp__.putPairing(A9Dom.type.area_bash.bracket_md,'[',']');
        __ascp__.putPairing(A9Dom.type.area_bash.bracket_bg,'{','}');

        var word_builtin = ['source',
            'alias',
            'bg',
            'bind',
            'builtin',
            'cd',
            'caller',
            'command',
            'compgen',
            'complete',
            'dirs',
            'disown',
            'echo',
            'enable',
            'eval',
            'exec',
            'exit',
            'fc',
            'fg',
            'getopts',
            'hash',
            'help',
            'history',
            'jobs',
            'kill',
            'let',
            'logout',
            'popd',
            'printf',
            'pushd',
            'pwd',
            'shift',
            'shopt',
            'suspend',
            'time',
            'times',
            'trap',
            'type',
            'ulimit',
            'umask',
            'unalias',
            'wait'];
            
        var word_keyword  = ['export',
            'unset',
            'declare',
            'typeset',
            'local',
            'read',
            'readonly',
            'break',
            'case',
            'continue',
            'for',
            'if',
            'local',
            'return',
            'select',
            'set',
            'test',
            'unset',
            'until',
            'while',
            'do',
            'done',
            'and',
            'or',
            'esac',
            'fi',
            'else',
            'true',
            'then',
            'in',
            'elif'];
            
        var word_command = ['arch',
            'awk',
            'bash',
            'bunzip2',
            'bzcat',
            'bzcmp',
            'bzdiff',
            'bzegrep',
            'bzfgrep',
            'bzgrep',
            'bzip2',
            'bzip2recover',
            'bzless',
            'bzmore',
            'cat',
            'chattr',
            'chgrp',
            'chmod',
            'chown',
            'chvt',
            'cp',
            'date',
            'dd',
            'deallocvt',
            'df',
            'dir',
            'dircolors',
            'dmesg',
            'dnsdomainname',
            'domainname',
            'du',
            'dumpkeys',
            'echo',
            'ed',
            'egrep',
            'false',
            'fgconsole',
            'fgrep',
            'fuser',
            'gawk',
            'getkeycodes',
            'gocr',
            'grep',
            'groff',
            'groups',
            'gunzip',
            'gzexe',
            'gzip',
            'hostname',
            'igawk',
            'install',
            'kbd_mode',
            'kbdrate',
            'killall',
            'last',
            'lastb',
            'link',
            'ln',
            'loadkeys',
            'loadunimap',
            'login',
            'ls',
            'lsattr',
            'lsmod',
            'lsmod.old',
            'mapscrn',
            'mesg',
            'mkdir',
            'mkfifo',
            'mknod',
            'mktemp',
            'more',
            'mount',
            'mv',
            'nano',
            'netstat',
            'nisdomainname',
            'nroff',
            'openvt',
            'pgawk',
            'pidof',
            'ping',
            'ps',
            'pstree',
            'pwd',
            'rbash',
            'readlink',
            'red',
            'resizecons',
            'rm',
            'rmdir',
            'run-parts',
            'sash',
            'sed',
            'setfont',
            'setkeycodes',
            'setleds',
            'setmetamode',
            'setserial',
            'sh',
            'showkey',
            'shred',
            'sleep',
            'ssed',
            'stat',
            'stty',
            'su',
            'sync',
            'tar',
            'tempfile',
            'touch',
            'troff',
            'true',
            'umount',
            'uname',
            'unicode_start',
            'unicode_stop',
            'unlink',
            'utmpdump',
            'uuidgen',
            'vdir',
            'wall',
            'wc',
            'ypdomainname',
            'zcat',
            'zcmp',
            'zdiff',
            'zegrep',
            'zfgrep',
            'zforce',
            'zgrep',
            'zless',
            'zmore',
            'znew',
            'zsh',
            //some from /usr/bin
            'aclocal',
            'aconnect',
            'aplay',
            'apm',
            'apmsleep',
            'apropos',
            'ar',
            'arecord',
            'as',
            'as86',
            'autoconf',
            'autoheader',
            'automake',
            'awk',
            'basename',
            'bc',
            'bison',
            'c++',
            'cal',
            'cat',
            'cc',
            'cdda2wav',
            'cdparanoia',
            'cdrdao',
            'cd-read',
            'cdrecord',
            'chfn',
            'chgrp',
            'chmod',
            'chown',
            'chroot',
            'chsh',
            'clear',
            'cmp',
            'co',
            'col',
            'comm',
            'cp',
            'cpio',
            'cpp',
            'cut',
            'dc',
            'dd',
            'df',
            'diff',
            'diff3',
            'dir',
            'dircolors',
            'directomatic',
            'dirname',
            'du',
            'env',
            'expr',
            'fbset',
            'file',
            'find',
            'flex',
            'flex++',
            'fmt',
            'free',
            'ftp',
            'funzip',
            'fuser',
            'g++',
            'gawk',
            'gc',
            'gcc',
            'gdb',
            'getent',
            'getopt',
            'gettext',
            'gettextize',
            'gimp',
            'gimp-remote',
            'gimptool',
            'gmake',
            'gs',
            'head',
            'hexdump',
            'id',
            'install',
            'join',
            'kill',
            'killall',
            'ld',
            'ld86',
            'ldd',
            'less',
            'lex',
            'ln',
            'locate',
            'lockfile',
            'logname',
            'lp',
            'lpr',
            'ls',
            'lynx',
            'm4',
            'make',
            'man',
            'mkdir',
            'mknod',
            'msgfmt',
            'mv',
            'namei',
            'nasm',
            'nawk',
            'nice',
            'nl',
            'nm',
            'nm86',
            'nmap',
            'nohup',
            'nop',
            'od',
            'passwd',
            'patch',
            'pcregrep',
            'pcretest',
            'perl',
            'perror',
            'pidof',
            'pr',
            'printf',
            'procmail',
            'prune',
            'ps2ascii',
            'ps2epsi',
            'ps2frag',
            'ps2pdf',
            'ps2ps',
            'psbook',
            'psmerge',
            'psnup',
            'psresize',
            'psselect',
            'pstops',
            'rcs',
            'rev',
            'rm',
            'scp',
            'sed',
            'seq',
            'setterm',
            'shred',
            'size',
            'size86',
            'skill',
            'slogin',
            'snice',
            'sort',
            'sox',
            'split',
            'ssh',
            'ssh-add',
            'ssh-agent',
            'ssh-keygen',
            'ssh-keyscan',
            'stat',
            'strings',
            'strip',
            'sudo',
            'suidperl',
            'sum',
            'tac',
            'tail',
            'tee',
            'test',
            'tr',
            'uniq',
            'unlink',
            'unzip',
            'updatedb',
            'updmap',
            'uptime',
            'users',
            'vmstat',
            'w',
            'wc',
            'wget',
            'whatis',
            'whereis',
            'which',
            'who',
            'whoami',
            'write',
            'xargs',
            'yacc',
            'yes',
            'zip',
            'zsoelim',
            //others
            'dcop',
            'kdialog',
            'kfile',
            'xhost',
            'xmodmap',
            'xset'];
        
        __ascp__.putKeyword(A9Dom.type.area_bash.word_builtin,word_builtin);
        __ascp__.putKeyword(A9Dom.type.area_bash.word_keyword,word_keyword);
        __ascp__.putKeyword(A9Dom.type.area_bash.word_command,word_command);
        
    }
    ////
    this.parse = function(a9dom,func)
    {
       if(a9dom == null || 'bash' != a9dom.getInfo(A9Dom.type.area$type))
            return;
        __ascp__.parse(a9dom);
        
        if(func instanceof Function)
        try{func(a9dom)}catch(e){};
    }
}