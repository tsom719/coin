@echo off
title Minecraft Server ing...
:main
cls
echo.
echo ┍──────────────────────────────
echo │
echo │   1. Start Server
echo │
echo ┕──────────────────────────────


set /p a=원하는 항목의 숫자를 입력하고 엔터(Enter) :
if %a%==1 goto RAM
if %a%==2 goto way
if %a%==3 goto color


:RAM
cls
echo.
echo ┍───────────────────────────────
echo │
echo │    1. 512MB
echo │
echo │    2. 1GB
echo │
echo │    3. 2GB
echo │
echo │    4. 4GB
echo │
echo │    5. 8GB
echo │
echo │    6. 16GB
echo │
echo ┕───────────────────────────────


set /p b=원하는 램 용량 항목의 숫자를 입력하고 엔터(Enter) :
if %b%==1 goto RAM_512
if %b%==2 goto RAM_1
if %b%==3 goto RAM_2
if %b%==4 goto RAM_4
if %b%==5 goto RAM_8
if %b%==6 goto RAM_16
if %b%==7 goto JAVA64


:RAM_512
cls
echo.
echo ┍───────────────────────────────
echo │   서버를 시작합니다
echo │
echo │
echo │   자바를 탐지중입니다
echo ┕───────────────────────────────

java -Xms512M -Xmx512M -jar core.jar
PAUSE
goto main


:RAM_1
cls
echo.
echo ┍───────────────────────────────
echo │   서버를 시작합니다
echo │
echo │
echo │   자바를 탐지중입니다
echo ┕───────────────────────────────

java -Xms1G -Xmx1G -jar core.jar
PAUSE
goto main


:RAM_2
cls
echo.
echo ┍───────────────────────────────
echo │   서버를 시작합니다
echo │
echo │
echo │   자바를 탐지중입니다
echo ┕───────────────────────────────

java -Xms1G -Xmx2G -jar core.jar
PAUSE
goto main


:RAM_4
cls
echo.
echo ┍───────────────────────────────
echo │   서버를 시작합니다
echo │
echo │
echo │   자바를 탐지중입니다
echo ┕───────────────────────────────

java -Xms1G -Xmx4G -jar core.jar
PAUSE
goto main


:RAM_8
cls
echo.
echo ┍───────────────────────────────
echo │   서버를 시작합니다
echo │
echo │
echo │   자바를 탐지중입니다
echo ┕───────────────────────────────

java -Xms1G -Xmx8G -jar core.jar
PAUSE
goto main


:RAM_16
cls
echo.
echo ┍───────────────────────────────
echo │   서버를 시작합니다
echo │
echo │
echo │   자바를 탐지중입니다
echo ┕───────────────────────────────

java -Xms1G -Xmx16G -jar core.jar
PAUSE
goto main


:JAVA64
cls
explorer "https://www.koreaminecraft.net/board_info/388965"
goto RAM


:blog
cls
explorer "http://freeroute.tistory.com/"
goto main

:way
cls
explorer https://www.koreaminecraft.net/server_tip/22732
goto main

:color
cls
echo.
echo ┍────────────────────────────
echo │                                                                        
echo │                                                                  
echo │                글씨색깔 변경하기                                                        
echo │                                                                  
echo │                                                                        
echo │                                                                    
echo │     1. 흰색                      2. 노랑색                           
echo │                                                                        
echo │                                                                      
echo │     3. 분홍색                    4. 빨강색                           
echo │                                                                           
echo │                                                                        
echo │     5. 연한 옥색                 6. 밝은 초록색                      
echo │                                                                        
echo │                                                                      
echo │     7. 연한 파랑색               8. 회색                             
echo │                                                                        
echo │                                                                        
echo │     9. 연한 회색                 10. 황금색                          
echo │                                                                        
echo │                                                                        
echo │     11. 보라색                   12. 어두운 빨강색                   
echo │                                                                        
echo │                                                                       
echo │     13. 옥색                     14. 어두운 초록색                   
echo │                                                                        
echo │                                                                       
echo │     15. 어두운 파랑색            16 메인으로 이동              
echo │
echo │
echo │
echo ┕─────────────────────────────

set /p colorsetting=원하는 색깔의 숫자 적은 후 Enter :
if /i "%colorsetting%"=="1" color 0f
if /i "%colorsetting%"=="2" color 0e
if /i "%colorsetting%"=="3" color 0d
if /i "%colorsetting%"=="4" color 0c
if /i "%colorsetting%"=="5" color 0b
if /i "%colorsetting%"=="6" color 0a
if /i "%colorsetting%"=="7" color 09
if /i "%colorsetting%"=="8" color 08
if /i "%colorsetting%"=="9" color 07
if /i "%colorsetting%"=="10" color 06
if /i "%colorsetting%"=="11" color 05
if /i "%colorsetting%"=="12" color 04
if /i "%colorsetting%"=="13" color 03
if /i "%colorsetting%"=="14" color 02
if /i "%colorsetting%"=="15" color 01
if /i "%colorsetting%"=="16" goto main

:error5
goto color

:freeroute
goto FreeRouteAPI