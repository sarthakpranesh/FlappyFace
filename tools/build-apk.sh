# Go to ROOT of project
cd ../

# Build the Android .apk files
cd ./android 
./gradlew clean
./gradlew assembleRelease

cd ../

# Copy the build files to a more accessible location
rm -r ./builds/*
cp -R ./android/app/build/outputs/apk/release/*.apk ./builds/