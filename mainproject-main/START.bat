@echo off
title Minecraft Server ing...
:main
cls
echo.
echo �Ȧ�����������������������������������������������������������
echo ��
echo ��   1. Start Server
echo ��
echo �Ʀ�����������������������������������������������������������


set /p a=���ϴ� �׸��� ���ڸ� �Է��ϰ� ����(Enter) :
if %a%==1 goto RAM
if %a%==2 goto way
if %a%==3 goto color


:RAM
cls
echo.
echo �Ȧ�������������������������������������������������������������
echo ��
echo ��    1. 512MB
echo ��
echo ��    2. 1GB
echo ��
echo ��    3. 2GB
echo ��
echo ��    4. 4GB
echo ��
echo ��    5. 8GB
echo ��
echo ��    6. 16GB
echo ��
echo �Ʀ�������������������������������������������������������������


set /p b=���ϴ� �� �뷮 �׸��� ���ڸ� �Է��ϰ� ����(Enter) :
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
echo �Ȧ�������������������������������������������������������������
echo ��   ������ �����մϴ�
echo ��
echo ��
echo ��   �ڹٸ� Ž�����Դϴ�
echo �Ʀ�������������������������������������������������������������

java -Xms512M -Xmx512M -jar core.jar
PAUSE
goto main


:RAM_1
cls
echo.
echo �Ȧ�������������������������������������������������������������
echo ��   ������ �����մϴ�
echo ��
echo ��
echo ��   �ڹٸ� Ž�����Դϴ�
echo �Ʀ�������������������������������������������������������������

java -Xms1G -Xmx1G -jar core.jar
PAUSE
goto main


:RAM_2
cls
echo.
echo �Ȧ�������������������������������������������������������������
echo ��   ������ �����մϴ�
echo ��
echo ��
echo ��   �ڹٸ� Ž�����Դϴ�
echo �Ʀ�������������������������������������������������������������

java -Xms1G -Xmx2G -jar core.jar
PAUSE
goto main


:RAM_4
cls
echo.
echo �Ȧ�������������������������������������������������������������
echo ��   ������ �����մϴ�
echo ��
echo ��
echo ��   �ڹٸ� Ž�����Դϴ�
echo �Ʀ�������������������������������������������������������������

java -Xms1G -Xmx4G -jar core.jar
PAUSE
goto main


:RAM_8
cls
echo.
echo �Ȧ�������������������������������������������������������������
echo ��   ������ �����մϴ�
echo ��
echo ��
echo ��   �ڹٸ� Ž�����Դϴ�
echo �Ʀ�������������������������������������������������������������

java -Xms1G -Xmx8G -jar core.jar
PAUSE
goto main


:RAM_16
cls
echo.
echo �Ȧ�������������������������������������������������������������
echo ��   ������ �����մϴ�
echo ��
echo ��
echo ��   �ڹٸ� Ž�����Դϴ�
echo �Ʀ�������������������������������������������������������������

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
echo �Ȧ�������������������������������������������������������
echo ��                                                                        
echo ��                                                                  
echo ��                �۾����� �����ϱ�                                                        
echo ��                                                                  
echo ��                                                                        
echo ��                                                                    
echo ��     1. ���                      2. �����                           
echo ��                                                                        
echo ��                                                                      
echo ��     3. ��ȫ��                    4. ������                           
echo ��                                                                           
echo ��                                                                        
echo ��     5. ���� ����                 6. ���� �ʷϻ�                      
echo ��                                                                        
echo ��                                                                      
echo ��     7. ���� �Ķ���               8. ȸ��                             
echo ��                                                                        
echo ��                                                                        
echo ��     9. ���� ȸ��                 10. Ȳ�ݻ�                          
echo ��                                                                        
echo ��                                                                        
echo ��     11. �����                   12. ��ο� ������                   
echo ��                                                                        
echo ��                                                                       
echo ��     13. ����                     14. ��ο� �ʷϻ�                   
echo ��                                                                        
echo ��                                                                       
echo ��     15. ��ο� �Ķ���            16 �������� �̵�              
echo ��
echo ��
echo ��
echo �Ʀ���������������������������������������������������������

set /p colorsetting=���ϴ� ������ ���� ���� �� Enter :
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