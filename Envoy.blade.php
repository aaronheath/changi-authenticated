@servers(['changi' => 'www-data@139.162.13.31'])

@task('deploy', ['on' => 'changi', 'confirm' => true])
cd /var/www/io_aaronheath_admin
git pull origin master
rm -rf node_modules
npm ci
npm build
@endtask
