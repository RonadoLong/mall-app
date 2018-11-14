/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <AVFoundation/AVFoundation.h>
#import "Orientation.h"
#import <UMCommon/UMCommon.h>
#import <UMShare/UMShare.h>
//#import "RCTLinkingManager.h"
#import "AlipayModule.h"
#import "UPPayControl.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  [self configSDK];
  
  [self configUSharePlatforms];
  
  NSURL *jsCodeLocation;
  
    #ifdef DEBUG
        jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
//        jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"index.ios" withExtension:@"jsbundle"];

    #else
        jsCodeLocation = [CodePush bundleURL];
    #endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"tohnets"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (void)configSDK
{
  
  /* appkey: 开发者在友盟后台申请的应用获得（可在统计后台的 “统计分析->设置->应用信息” 页面查看）*/
  [UMConfigure initWithAppkey:@"5b03a8688f4a9d458100021a" channel:@"App Store"];
  [UMConfigure setLogEnabled:true];
  [UMConfigure setVersion:1.0];
  
  /* 打开调试日志 */
  [[UMSocialManager defaultManager] openLog:YES];
  
  /* 设置友盟appkey */
  //  [[UMSocialManager defaultManager] setUmSocialAppkey:@"5aae82db8f4a9d41000002c3"];
}

- (void)configUSharePlatforms
{
  /* 设置微信的appKey和appSecret */
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession
                                        appKey:@"wx26883b527f83e86e"
                                     appSecret:@"a0c351280d61ab9a1a71e9ebacb266ba"
                                   redirectURL:@"http://mobile.umeng.com/social"];
  /*
   * 移除相应平台的分享，如微信收藏
   */
  //[[UMSocialManager defaultManager] removePlatformProviderWithPlatformTypes:@[@(UMSocialPlatformType_WechatFavorite)]];
  
  /* 设置Twitter的appKey和appSecret */
  //  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_Twitter appKey:@"fB5tvRpna1CKK97xZUslbxiet"  appSecret:@"YcbSvseLIwZ4hZg9YmgJPP5uWzd4zr6BpBKGZhf07zzh3oj62K" redirectURL:nil];
  /* 设置Facebook的appKey和UrlString */
  
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_Facebook
                                        appKey:@"506027402887373"
                                     appSecret:nil
                                   redirectURL:@"http://www.umeng.com/social"];
  
}

//支持所有iOS系统
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  //6.3的新的API调用，是为了兼容国外平台(例如:新版facebookSDK,VK等)的调用[如果用6.2的api调用会没有回调],对国内平台没有影响
  BOOL result = [[UMSocialManager defaultManager] handleOpenURL:url sourceApplication:sourceApplication annotation:annotation];
  if (!result)
  {
    // 其他如支付等SDK的回调
    
    if ([url.host isEqualToString:@"safepay"]) {
      [AlipayModule handleCallback:url];
      return YES;
    }
    
    if ([url.host hasPrefix:@"uppayresult"]) {
      [UPPayControl handleCallBack:url];
      return YES;
    }
    
    //    NSLog(@"%@", url.absoluteString);
    //    return [RCTLinkingManager application:application openURL:url
    //                        sourceApplication:sourceApplication annotation:annotation];
  }
  return result;
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
{
  //6.3的新的API调用，是为了兼容国外平台(例如:新版facebookSDK,VK等)的调用[如果用6.2的api调用会没有回调],对国内平台没有影响
  BOOL result = [[UMSocialManager defaultManager]  handleOpenURL:url options:options];
  if (!result)
  {
    // 其他如支付等SDK的回调 // ios 9.0+
    
    if ([url.host isEqualToString:@"safepay"]) {
      [AlipayModule handleCallback:url];
      return YES;
    }
    
    if ([url.host hasPrefix:@"uppayresult"]) {
      [UPPayControl handleCallBack:url];
      return YES;
    }
    NSLog(@"%@", url.absoluteString);
    //    return [RCTLinkingManager application:app openURL:url options:options];
  }
  return result;
}



//支持目前所有iOS系统
- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
{
  BOOL result = [[UMSocialManager defaultManager] handleOpenURL:url];
  if (!result)
  {
    // 其他如支付等SDK的回调
    
  }
  return result;
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}


@end
