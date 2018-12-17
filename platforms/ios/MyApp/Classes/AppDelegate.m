/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

//
//  AppDelegate.m
//  MyApp
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//  Copyright ___ORGANIZATIONNAME___ ___YEAR___. All rights reserved.
//

#import "AppDelegate.h"
#import "MainViewController.h"
#import <AlipaySDK/AlipaySDK.h>
#import "ZkPlugin.h"
#import "WXApi.h"
#import "UPPaymentControl.h"
#import "BPush.h"
@implementation AppDelegate

- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    self.viewController = [[MainViewController alloc] init];
    return [super application:application didFinishLaunchingWithOptions:launchOptions];
    if(launchOptions){
//        [ZkPlugin handKeepAlive:@{@"type": @"baiduPush"}];
    }
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
    
    [self handlePayUrl:url];
    return YES;
}

// NOTE: 9.0以后使用新API接口
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString*, id> *)options
{
    [self handlePayUrl:url];
    return YES;
}

- (void)handlePayUrl:(NSURL *)url {
    if ([url.host isEqualToString:@"safepay"]) {
        //跳转支付宝钱包进行支付，处理支付结果
        [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
            NSString *resultStatus =[resultDic objectForKey:@"resultStatus"];
            [ZkPlugin handlePayBack:resultStatus];
        }];
    }else if ([url.host isEqualToString:@"pay"]){
        [WXApi handleOpenURL:url delegate:self];
    }else if ([url.host isEqualToString:@"uppayresult"]){//银联支付
        [[UPPaymentControl defaultControl] handlePaymentResult:url completeBlock:^(NSString *code, NSDictionary *data) {
            
            //结果code为成功时，先校验签名，校验成功后做后续处理
            NSMutableString *jsStrings = nil;
            
            if([code isEqualToString:@"success"]) {
                [ZkPlugin handlePayBack:@"9000"];
            }
            else if([code isEqualToString:@"cancel"]) {
                [ZkPlugin handlePayBack:@"6001"];
                //交易取消
            }
            else{
                [ZkPlugin handlePayBack:@""];
                //交易失败
            }
            
        }];
    }
}

#pragma mark - WXApiDelegate
- (void)onResp:(BaseResp *)resp {
    //支付返回结果，实际支付结果需要去微信服务器端查询
    if(![resp isKindOfClass:[PayResp class]]) return;
    PayResp *response=(PayResp*)resp;
    if (response.errCode == WXSuccess) {
        [ZkPlugin handlePayBack:@"9000"];
    } else if(response.errCode == WXErrCodeUserCancel){
        [ZkPlugin handlePayBack:@"6001"];
    }else{
        [ZkPlugin handlePayBack:@""];
    }
    
}

- (void)initConfig {
//    [WXApi registerApp:@"wxa2b39ab02284567e" withDescription:@"nanjingertong"];
//    [WXApi registerApp:@"wx42bb71e7df629304" withDescription:@"nanjingertongcar"];
}
- (NSUInteger)application:(UIApplication*)application supportedInterfaceOrientationsForWindow:(UIWindow*)window
{
    // iPhone doesn't support upside down by default, while the iPad does.  Override to allow all orientations always, and let the root view controller decide what's allowed (the supported orientations mask gets intersected).
    NSUInteger supportedInterfaceOrientations = (1 << UIInterfaceOrientationPortrait);// | (1 << UIInterfaceOrientationLandscapeLeft) | (1 << UIInterfaceOrientationLandscapeRight) | (1 << UIInterfaceOrientationPortraitUpsideDown);
    
    return supportedInterfaceOrientations;
}
- (void)applicationDidReceiveMemoryWarning:(UIApplication*)application
{
    [[NSURLCache sharedURLCache] removeAllCachedResponses];
}


// 在 iOS8 系统中，还需要添加这个方法。通过新的 API 注册推送服务
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
    
    [application registerForRemoteNotifications];
    
    
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    NSLog(@"test:%@",deviceToken);
    [BPush registerDeviceToken:deviceToken];
    [BPush bindChannelWithCompleteHandler:^(id result, NSError *error) {
        // 需要在绑定成功后进行 settag listtag deletetag unbind 操作否则会失败
        // 网络错误
        if (error) {
            return ;
        }
        if (result) {
            [(AppDelegate *)[UIApplication sharedApplication].delegate setChannel_id:result[@"channel_id"]];
            [(AppDelegate *)[UIApplication sharedApplication].delegate setUser_id:result[@"user_id"]];
        }
    }];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    
    NSLog(@"test:%@",error);
    
}

// 此方法是 用户点击了通知，应用在前台 或者开启后台并且应用在后台 时调起
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
    // 打印到日志 textView 中
    
    NSLog(@"********** iOS7.0之后 background **********");
    //杀死状态下，直接跳转到跳转页面。
    if (application.applicationState == UIApplicationStateActive)
    {
                NSString * message = userInfo[@"aps"][@"alert"];
        //        [self localNoti:message];
        [ZkPlugin handKeepAlive:@{@"type": @"baiduPushActive",@"detail":message}];
    }else{
        [ZkPlugin handKeepAlive:@{@"type": @"baiduPush"}];
    }
    
    
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
    // App 收到推送的通知
    [BPush handleNotification:userInfo];
    NSLog(@"********** ios7.0之前 **********");
    // 应用在前台 或者后台开启状态下，不跳转页面，让用户选择。
    if (application.applicationState == UIApplicationStateActive) {
        NSString * message = userInfo[@"aps"][@"alert"];
        [self localNoti:message];
    }
    
}

- (void)localNoti:(NSString *)message{
    //    [self registerNotification:5];
    // 1.创建通知
    //    UILocalNotification *localNotification = [[UILocalNotification alloc] init];
    //    // 2.设置通知的必选参数
    //    // 设置通知显示的内容
    //    localNotification.alertBody = message;
    //    // 设置通知的发送时间,单位秒
    //    localNotification.fireDate = [NSDate dateWithTimeIntervalSinceNow:10];
    //    //解锁滑动时的事件
    //    localNotification.alertAction = @"别磨蹭了!";
    //
    //    [[UIApplication sharedApplication] presentLocalNotificationNow:localNotification];
}
//使用 UNNotification 本地通知


- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
    
}

@end
