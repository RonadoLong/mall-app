//
//  share.m
//  TohNet
//
//  Created by mac on 2018/5/22.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "share.h"
#import <React/RCTBridgeModule.h>
#import <UMShare/UMShare.h>


@implementation share
RCT_EXPORT_MODULE(share)
RCT_EXPORT_METHOD(share:(NSInteger )platformType
                  title:(NSString*)title
                  descr:(NSString*)descr
                  thumbURL:(NSString*)thumbURLl
                  webpageUrl:(NSString*)webpageUrl
                  callback:(RCTResponseSenderBlock)callback)
{
  //创建分享消息对象
  UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
  //创建网页内容对象
  NSString* thumbURL =  thumbURLl;
  UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:title descr:descr thumImage:thumbURL];
  //设置网页地址
  shareObject.webpageUrl = webpageUrl;
  //分享消息对象设置分享内容对象
  messageObject.shareObject = shareObject;

  dispatch_async(dispatch_get_main_queue(), ^{
    //调用分享接口
    [[UMSocialManager defaultManager] shareToPlatform:platformType
                                        messageObject:messageObject
                                currentViewController:nil
                                           completion:^(id data, NSError *error) {
      
      NSString *code = [NSString stringWithFormat:@"%ld",(long)error.code];
      NSString *message = data;
      
      if (error) {
        UMSocialLogInfo(@"************Share fail with error %@*********",error);
      }else{
        if ([data isKindOfClass:[UMSocialShareResponse class]]) {
          UMSocialShareResponse *resp = data;
          //分享结果消息
          UMSocialLogInfo(@"response message is %@",resp.message);
          //第三方原始返回的数据
          UMSocialLogInfo(@"response originalResponse data is %@",resp.originalResponse);
          code = @"200";
          message = resp.originalResponse;
        }else{
          UMSocialLogInfo(@"response data is %@",data);
        }
      }
      callback( [[NSArray alloc] initWithObjects:code,message, nil]);
    }];
   });
  }

@end

