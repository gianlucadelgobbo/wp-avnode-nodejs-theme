 <VirtualHost *:80>
	ServerAdmin webmaster@localhost
	ServerName videosolid.com
	ServerAlias www.videosolid.com videosolid.dev.flyer.it
	DocumentRoot /sites/dev.flyer/
	<Directory />
		Options FollowSymLinks
		AllowOverride None
	</Directory>
	<Directory /sites/dev.flyer/>
		Options FollowSymLinks MultiViews
		AllowOverride All
		Order allow,deny
		allow from all
		# This directive allows us to have apache2's default start page
                # in /apache2-default/, but still have / go to the right place
		#RedirectMatch ^/$ /apache2-default/
	</Directory>

	ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/
	<Directory "/usr/lib/cgi-bin">
		AllowOverride None
		Options ExecCGI MultiViews SymLinksIfOwnerMatch
		Order allow,deny
		Allow from all
	</Directory>

	ErrorLog /var/log/apache2/www_videosolid_com-error.log

	# Possible values include: debug, info, notice, warn, error, crit,
	# alert, emerg.
	LogLevel warn

	CustomLog /var/log/apache2/www_videosolid_com-access.log combined
	ServerSignature On

#    Alias /doc/ "/usr/share/doc/"
#    <Directory "/usr/share/doc/">
#        Options Indexes MultiViews FollowSymLinks
#        AllowOverride None
#        Order deny,allow
#        Deny from all
#        Allow from 127.0.0.0/255.0.0.0 ::1/128
#    </Directory>

RewriteEngine on
RewriteCond %{SERVER_NAME} =videosolid.com [OR]
RewriteCond %{SERVER_NAME} =www.videosolid.com [OR]
RewriteCond %{SERVER_NAME} =videosolid.dev.flyer.it
RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,QSA,R=permanent]
</VirtualHost>

