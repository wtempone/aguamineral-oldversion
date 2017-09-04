Assinar app no android:

keytool -genkey -v -keystore my-release-key.keystore -alias AguaMineral -keyalg RSA -keysize 2048 -validity 10000
keytool -exportcert -alias AguaMineral -keystore my-release-key.keystore | openssl sha1 -binary | openssl base64

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk AguaMineral
$ANDROID_HOME/build-tools/25.0.2/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/AguaMineral.apk
adb -d install platforms/android/build/outputs/apk/AguaMineral.apk