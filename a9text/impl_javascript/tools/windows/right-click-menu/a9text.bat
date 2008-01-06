@ECHO OFF
REM $a9text/tools/windows/right-click-menu/a9text.bat
REM a9text.bat need reg.exe

ECHO Thanks for using a9text.
ECHO And more help in readme.txt
ECHO [CTRL-C] to break,other key to continue.
PAUSE >NUL

if not "%A9TEXT_HOME%" == "" goto gotHome

:guessHome
SET CURRENT_DIR=%CD%
CD ../../../
SET A9TEXT_HOME=%CD%
CD %CURRENT_DIR%


:gotHome
ECHO A9TEXT_HOME = %A9TEXT_HOME%
SET REGVAL="iexplore.exe file://%A9TEXT_HOME%/a9text.htm#file://%%1"
SET REGKEY=HKEY_CLASSES_ROOT\*\shell\a9text\command /ve
REG ADD %REGKEY% /t REG_SZ /d %REGVAL% /f

PAUSE