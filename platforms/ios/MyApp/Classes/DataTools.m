//
//  DataTools.m
//  MyApp
//
//  Created by cfl on 2017/8/10.
//
//

#import "DataTools.h"

@implementation DataTools
singleton_implementation(DataTools)

- (void)clearPlugin {
    self.cdvPluginDelegate = nil;
    self.callbackId = nil;
}
@end
