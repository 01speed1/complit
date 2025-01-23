import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('validate-token')
  async validateToken(@Req() req, @Res() res) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new HttpException('Token is required', HttpStatus.BAD_REQUEST);
    }

    const isValid = await this.authService.validateToken(token);

    if (!isValid) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const { access_token } = await this.authService.refreshToken(token);

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Token is valid', access_token });
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const { access_token: token } = await this.authService.login(req.user);

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return res.redirect(`${process.env.CLIENT_URL}/auth/callback`);
  }
}
