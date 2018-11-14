//
//  ULogin.m
//  TohNet
//
//  Created by mac on 2018/5/22.
//  Copyright © 2018年 Facebook. All rights reserved.
//



#import "ULogin.h"
#import <React/RCTBridgeModule.h>
#import <UMShare/UMShare.h>


@implementation ULogin
RCT_EXPORT_MODULE(ULogin)
RCT_EXPORT_METHOD(login:(int)platformType callback:(RCTResponseSenderBlock)callback)
{
  
  int type;
  if (platformType == 0){
    type = UMSocialPlatformType_WechatSession;
  }else{
    type = UMSocialPlatformType_Facebook;
  }
  
  dispatch_async(dispatch_get_main_queue(), ^{
    
    [[UMSocialManager defaultManager] getUserInfoWithPlatform:type
                                        currentViewController:nil
                                                   completion:^(id result, NSError *error) {
      
      NSString * code = [NSString stringWithFormat:@"%ld",(long)error.code];
      NSString *message = result;
      
      if (error) {
        UMSocialLogInfo(@"************Share fail with error %@*********",error);
      } else {
        UMSocialUserInfoResponse *resp = result;
        // 授权信息
        UMSocialLogInfo(@"Facebook uid: %@", resp.uid);
        UMSocialLogInfo(@"Facebook accessToken: %@", resp.accessToken);
        UMSocialLogInfo(@"Facebook expiration: %@", resp.expiration);
        // 用户信息
        UMSocialLogInfo(@"Facebook name: %@", resp.name);
        // 第三方平台SDK源数据
        UMSocialLogInfo(@"Facebook originalResponse: %@", resp.originalResponse);
        code = @"200";
        message = resp.originalResponse;
      }
                                                     
      callback([[NSArray alloc] initWithObjects:code,message, nil]);

    }];

  });

}

@end


