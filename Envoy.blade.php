@servers(['changi' => 'aaronheath@changi.aaronheath.io'])

@task('deploy', ['on' => 'changi', 'confirm' => true])
cd /var/www/changi-authentication
git pull origin master
rm -rf node_modules
npm ci
npm run production
chgrp -R www-data *
@endtask
