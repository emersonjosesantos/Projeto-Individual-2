from statistics import mean
import subprocess
import time
import psutil
import numpy
import datetime
import functools
import operator
import pyodbc 
import textwrap

def Conexao():

        # variaveis de conexao
        driver ='{ODBC Driver 18 for SQL Server}'
        server_name = 'montioll'
        database_name = 'Monitoll'
        server = '{server_name}.database.windows.net,1433'.format(server_name=server_name)
        username = 'Monitoll'
        password = 'Grupo7@123'
        # definindo banco url 
        connection_string = textwrap.dedent('''
        Driver={driver};
        Server={server};
        Database={database};
        Uid={username};
        Pwd={password};
        Encrypt=yes;
        TrustedServerCertificate=no;
        Connection Timeout=10;
        '''.format(
            driver=driver,
            server=server,
            database=database_name,
            username=username,
            password=password
        )) 

        cnxn:pyodbc.Connection = pyodbc.connect(connection_string) 

        global crsr
        crsr = cnxn.cursor()
        print("Conectado ao banco de dados: MoniToll")

def teste():

        # datahora = datetime.datetime.now().strftime('%d/%m/%Y %H:%M:%S')
        # data = psutil.sensors_temperatures()
        # core = data['coretemp']
        # item = core[0]
        # tempcpu = item.current
        try:
        # Executando comando SQL   
            crsr.execute('''
        SELECT COUNT(idAlerta) FROM AlertaRenato where nomeEmp = 'sptech' and componente = 'CPU'
        ''')
                # Commit de mudanças no banco de dados
            crsr.commit()
            print("Read",crsr.rowcount,"row(s) of data.")

        except pyodbc.Error as err:
            cnxn.roolback()
            print("Something went wrong: {}".format(err))
            
Conexao()
while True:
    teste()
    time.sleep(5)

# with pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password) as conn:
#     with conn.cursor() as cursor:
#         cursor.execute("SELECT TOP 3 name, collation_name FROM sys.databases")
#         row = cursor.fetchone()
#         while row:
#             print (str(row[0]) + " " + str(row[1]))
#             row = cursor.fetchone()
