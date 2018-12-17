//
//  DataTools.h
//  MyApp
//
//  Created by cfl on 2017/8/10.
//
//

#import <Foundation/Foundation.h>
#import "Singleton.h"
#import <Cordova/CDVCommandDelegate.h>

@interface DataTools : NSObject
singleton_interface(DataTools)

@property (nonatomic, strong) id <CDVCommandDelegate> keepAlivePluginDelegate;

@property (nonatomic, copy) NSString* keepAliveCallbackId;

@property (nonatomic, strong) id <CDVCommandDelegate> cdvPluginDelegate;

@property (nonatomic, copy) NSString* callbackId;

@property (nonatomic, copy) NSString* wxCallbackId;

- (void)clearPlugin;

@end
